import { AIChatAgent } from "@cloudflare/ai-chat";
import { convertToModelMessages, type UIMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { streamAgent } from "./agent-core";
import type { ExcalidrawElement } from "./schemas";

interface Env extends Cloudflare.Env {
  OPENAI_API_KEY: string;
}
type CanvasStatePart = {
  type: "data-canvas-state";
  data: { elements: ExcalidrawElement[] };
};

function extractCanvasState(messages: UIMessage[]): ExcalidrawElement[] {
  const last = messages.at(-1);
  const part = last?.parts.find(
    (p): p is CanvasStatePart => (p as { type?: string }).type === "data-canvas-state"
  );
  return part?.data.elements ?? [];
}

export class DesignAgent extends AIChatAgent<Env> {
  async onChatMessage() {
    const openai = createOpenAI({ apiKey: this.env.OPENAI_API_KEY });
    const model = openai("gpt-5.4-mini");

    const canvasState = extractCanvasState(this.messages);
    const messages = await convertToModelMessages(this.messages);

    const result = streamAgent({
      model,
      messages,
     // canvasState,
      env: {TAVILY_API_KEY: this.env.TAVILY_API_KEY}
    });

    return result.toUIMessageStreamResponse();
  }
}
