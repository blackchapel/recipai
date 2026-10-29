import { useEffect, useState } from "react";
import prompt from "../content/ai-chat-prompt.txt?raw";
import { Icon } from "./Icon";

/**
 * The prompt Recipai's Import screen copies for AI chat assistants. The text
 * is the app's own (core/.../AiChatPrompt.kt); a core test fails if this copy
 * drifts. The Copy button appears once the page's JavaScript is running; the
 * full text is always on the page to select.
 */
export function PromptBox() {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => setReady(true), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2500);
  };

  return (
    <div className="prompt-box">
      {ready && (
        <button type="button" className="btn btn-flame" onClick={copy}>
          <Icon name={state === "copied" ? "check" : "clip"} size={18} />
          {state === "copied" ? "Copied" : state === "failed" ? "Couldn't copy: select the text below" : "Copy the prompt"}
        </button>
      )}
      <details open={state === "failed" || undefined}>
        <summary>Show the prompt</summary>
        <pre tabIndex={0} aria-label="The Recipai prompt for AI chat assistants">{prompt}</pre>
      </details>
    </div>
  );
}
