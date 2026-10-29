package com.blackchapel.recipai.ui.importer

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.unit.dp
import com.blackchapel.recipai.core.AiChatPrompt
import com.blackchapel.recipai.haptics.HapticType
import com.blackchapel.recipai.ui.components.ButtonStyle
import com.blackchapel.recipai.ui.components.Ico
import com.blackchapel.recipai.ui.components.RButton
import com.blackchapel.recipai.ui.components.RIcon
import com.blackchapel.recipai.ui.components.tap
import com.blackchapel.recipai.ui.theme.LocalColors
import com.blackchapel.recipai.ui.theme.RecipaiType

/**
 * "Let an AI chat tidy it": a prompt to copy into ChatGPT, Claude, Gemini or
 * any assistant, with the recipe link or text. Its reply is in the format the
 * text importer reads exactly ([AiChatPrompt]). Recipai itself never connects
 * to an AI service: this only puts text on the clipboard.
 */
@Composable
fun AiChatCard(modifier: Modifier = Modifier) {
    val c = LocalColors.current
    val clipboard = LocalClipboardManager.current
    var open by remember { mutableStateOf(false) }
    var copied by remember { mutableStateOf(false) }
    val shape = RoundedCornerShape(16.dp)
    Column(
        modifier
            .fillMaxWidth()
            .background(c.surface2, shape)
            .border(1.dp, c.line, shape),
    ) {
        Row(
            Modifier
                .fillMaxWidth()
                .tap(
                    pressedScale = 0.99f,
                    label = if (open) "Hide the AI chat steps" else "Show the AI chat steps",
                    isChecked = open,
                ) { open = !open }
                .padding(horizontal = 14.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Box(Modifier.size(34.dp).background(c.saffron.copy(alpha = 0.16f), CircleShape), contentAlignment = Alignment.Center) {
                RIcon(Ico.Spark, size = 18.dp, tint = c.accentInk)
            }
            Column(Modifier.weight(1f)) {
                Text("Messy recipe? Let an AI chat tidy it", style = RecipaiType.cell, color = c.ink)
                Text("Works with ChatGPT, Claude, Gemini and others", style = RecipaiType.bodySmall, color = c.mute)
            }
            RIcon(if (open) Ico.Up else Ico.Down, size = 18.dp, tint = c.faint)
        }
        if (open) {
            Column(
                Modifier.padding(start = 14.dp, end = 14.dp, bottom = 14.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                listOf(
                    "Copy the prompt below.",
                    "Paste it into your AI chat app and add your recipe link or text.",
                    "Answer any questions it asks.",
                    "Copy its reply and paste it here.",
                ).forEachIndexed { i, step ->
                    Row(horizontalArrangement = Arrangement.spacedBy(10.dp), verticalAlignment = Alignment.Top) {
                        Box(Modifier.size(22.dp).background(c.surface3, CircleShape), contentAlignment = Alignment.Center) {
                            Text("${i + 1}", style = RecipaiType.monoSmall, color = c.ink)
                        }
                        Text(step, style = RecipaiType.bodySmall, color = c.body, modifier = Modifier.weight(1f))
                    }
                }
                RButton(
                    if (copied) "Copied" else "Copy the prompt",
                    {
                        clipboard.setText(AnnotatedString(AiChatPrompt.TEXT))
                        copied = true
                    },
                    Modifier.fillMaxWidth(),
                    icon = if (copied) Ico.Check else Ico.Clip,
                    style = ButtonStyle.CTA,
                    haptic = HapticType.SUCCESS,
                )
                Text(
                    "Recipai doesn't connect to any AI service. Whatever you give your chat app is handled by that app.",
                    style = RecipaiType.bodySmall,
                    color = c.faint,
                )
            }
        }
    }
}
