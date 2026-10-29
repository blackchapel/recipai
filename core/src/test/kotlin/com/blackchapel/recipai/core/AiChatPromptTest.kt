package com.blackchapel.recipai.core

import java.io.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

/**
 * The AI chat prompt promises that what an assistant writes in the "Recipai
 * text format" imports exactly. These tests are that promise: the prompt's own
 * example, and a set of replies the way assistants really write them (and a
 * few ways they stray), must all parse with nothing dropped.
 */
class AiChatPromptTest {
    private fun parse(text: String) = TextRecipeParser.parse(text)

    @Test fun thePromptsOwnExampleImportsExactly() {
        val r = parse(AiChatPrompt.EXAMPLE)
        assertEquals("Creamy Tomato Soup", r.title)
        assertEquals("A smooth tomato soup with garlic and basil, ready in about 35 minutes.", r.description)
        assertEquals(4, r.servings)
        assertFalse(r.servingsGuessed)
        assertEquals(listOf("soup", "vegetarian", "quick"), r.tags)
        assertEquals("kitchen.example.com/creamy-tomato-soup", r.source)
        assertEquals(0, r.skippedLines, "nothing in a well-formed reply is dropped")

        assertEquals(
            listOf(
                ParsedIngredient("olive oil", 2.0, "tbsp"),
                ParsedIngredient("onion", 1.0, "", "finely chopped"),
                ParsedIngredient("garlic", 3.0, "clove", "minced"),
                ParsedIngredient("chopped tomatoes", 1.0, "can", "400 g"),
                ParsedIngredient("vegetable stock", 500.0, "ml"),
                ParsedIngredient("sugar", 0.5, "tsp"),
                ParsedIngredient("Salt", null, "", "to taste"),
                ParsedIngredient("For the topping", isHeading = true),
                ParsedIngredient("cream", 2.0, "tbsp"),
                ParsedIngredient("fresh basil", 1.0, "handful"),
            ),
            r.ingredients,
        )
        assertEquals(5, r.steps.size)
        assertEquals(listOf(5.0, 1.0, 20.0, 0.0, 0.0), r.steps.map { it.minutes })
        assertEquals("Heat the oil in a large pot over medium heat and soften the onion for 5 minutes.", r.steps[0].text)
        assertEquals("Keeps in the fridge for 3 days.\nFreezes well for up to 3 months.", r.notes)
        assertEquals(3, r.timerCount)
    }

    @Test fun aReplyWithoutOptionalLinesStillImports() {
        val r = parse(
            """
            Pancakes
            Fluffy pancakes for a slow weekend breakfast with maple syrup.

            Ingredients
            200 g flour
            2 eggs
            300 ml milk

            Method
            1. Whisk the flour, eggs and milk into a smooth batter.
            2. Fry ladles of batter for 2 minutes on each side.
            """.trimIndent(),
        )
        assertEquals("Pancakes", r.title)
        assertTrue(r.servingsGuessed, "no Servings line: the app says it guessed")
        assertNull(r.source)
        assertNull(r.servingsLabel)
        assertEquals(3, r.ingredients.size)
        assertEquals(2, r.steps.size)
        assertEquals(0, r.skippedLines)
        assertTrue("breakfast" in r.tags, "tags are guessed when the reply has no Tags line")
    }

    @Test fun servingsCountedInSomethingElseKeepTheirLabel() {
        val r = parse("Oat Cookies\nChewy oat cookies with raisins and a hint of cinnamon.\nServings: 12 cookies\n\nIngredients\n100 g oats\n\nMethod\n1. Bake the cookies for 12 minutes at 180 C.")
        assertEquals(12, r.servings)
        assertEquals("cookies", r.servingsLabel)
        val plain = parse("Soup\nA plain soup that needs nothing more than a pot and time.\nServings: 4 servings\n\nIngredients\n1 onion\n\nMethod\n1. Simmer the onion for 10 minutes.")
        assertEquals(4, plain.servings)
        assertNull(plain.servingsLabel, "the default word is not stored as a label")
    }

    @Test fun amountsRangesAndTimesAreReadAsTheFormatPromises() {
        val r = parse(
            """
            Braised Beef
            Beef braised slowly with onions until it falls apart on the fork.
            Servings: 6

            Ingredients
            1 1/2 lb beef chuck
            2-3 tbsp olive oil
            0.5 tsp salt
            1/2 cup red wine
            2 sprigs thyme
            1 knob butter

            Method
            1. Brown the beef in the oil for 10 minutes in batches.
            2. Cover and braise in the oven for 1 hour 30 minutes until tender.
            """.trimIndent(),
        )
        assertEquals(1.5, r.ingredients[0].quantity)
        assertEquals("lb", r.ingredients[0].unit)
        assertEquals(2.0, r.ingredients[1].quantity)
        assertEquals("2–3", r.ingredients[1].note)
        assertEquals(0.5, r.ingredients[2].quantity)
        assertEquals(0.5, r.ingredients[3].quantity)
        assertEquals("sprig", r.ingredients[4].unit)
        assertEquals("knob butter", r.ingredients[5].name, "a unit that isn't on the list stays in the name")
        assertEquals(10.0, r.steps[0].minutes)
        assertEquals(90.0, r.steps[1].minutes)
        assertEquals(0, r.skippedLines)
    }

    @Test fun markdownAndCodeFencesAreToleratedWhenAnAssistantAddsThem() {
        val r = parse(
            "```\r\n**Lemon Pasta**\r\nA bright lemon pasta that comes together while the water boils.\r\n**Servings:** 2\r\nTags: #Pasta, Quick Dinner\r\n\r\n**Ingredients**\r\n- 200 g spaghetti\r\n* 1 lemon\r\n\r\n__Method__\r\n1) Boil the spaghetti for 10 minutes in salted water.\r\n2) Toss with the lemon juice and zest and serve.\r\n```",
        )
        assertEquals("Lemon Pasta", r.title)
        assertEquals(2, r.servings)
        assertEquals(listOf("pasta", "quick-dinner"), r.tags)
        assertEquals(2, r.ingredients.size)
        assertEquals(2, r.steps.size)
        assertEquals(0, r.skippedLines)
    }

    @Test fun aRecipeInAnotherLanguageKeepsItsWordsAndEnglishHeadings() {
        val r = parse(
            """
            Tortilla española
            Una tortilla jugosa de patata y cebolla para compartir en familia.
            Servings: 4

            Ingredients
            500 g patatas
            4 huevos
            1 cebolla
            Sal, to taste

            Method
            1. Fríe las patatas y la cebolla a fuego lento (20 minutes).
            2. Mezcla con los huevos batidos y cuaja la tortilla por los dos lados (8 minutes).
            """.trimIndent(),
        )
        assertEquals("Tortilla española", r.title)
        assertEquals(4, r.ingredients.size)
        assertEquals(20.0, r.steps[0].minutes)
        assertEquals(8.0, r.steps[1].minutes)
        assertEquals(0, r.skippedLines)
    }

    @Test fun aSourceThatIsALinkLosesItsTrackingParameters() {
        val r = parse("Soup\nA plain soup that needs nothing more than a pot and time.\nSource: https://www.example.com/recipes/soup/?utm_source=chat#top\n\nIngredients\n1 onion\n\nMethod\n1. Simmer the onion for 10 minutes.")
        assertEquals("example.com/recipes/soup", r.source)
    }

    @Test fun thePromptAndTheParserAgreeOnUnits() {
        val listed = AiChatPrompt.TEXT.substringAfter("Use only these units: ").substringBefore(". If the source").split(", ")
        assertTrue(listed.size >= 20)
        for (unit in listed) assertEquals(unit, TextRecipeParser.canonicalUnit(unit), "\"$unit\" is not a unit the parser knows")
    }

    @Test fun thePromptNamesTheHeadingsTheParserNeeds() {
        for (heading in listOf("Ingredients", "Method", "Notes", "Servings:", "Tags:", "Source:")) {
            assertTrue(heading in AiChatPrompt.TEXT, heading)
        }
        // The shortest step the parser keeps is 12 characters; the prompt asks for more.
        assertTrue("at least 15 characters" in AiChatPrompt.TEXT)
    }

    @Test fun theWebsiteShowsExactlyThisPrompt() {
        val file = listOf("../website/src/content/ai-chat-prompt.txt", "website/src/content/ai-chat-prompt.txt").map(::File).firstOrNull { it.exists() }
        assertTrue(file != null, "website/src/content/ai-chat-prompt.txt is missing")
        assertEquals(AiChatPrompt.TEXT, file!!.readText(), "copy AiChatPrompt.TEXT into the website file")
    }
}
