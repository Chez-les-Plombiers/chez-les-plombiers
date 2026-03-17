import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "@/lib/guide-knowledge";

export const runtime = "edge";

const MAX_TURNS = 20;

export async function POST(request: Request) {
  const body = await request.json();
  const locale = body.locale || "fr";

  // Support both legacy single message and new conversation format
  let conversationMessages: { role: "user" | "assistant"; content: string }[];

  if (body.messages && Array.isArray(body.messages)) {
    conversationMessages = body.messages
      .filter(
        (m: { role: string; content: string }) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim()
      )
      .slice(-MAX_TURNS);
  } else if (body.message && typeof body.message === "string") {
    conversationMessages = [{ role: "user", content: body.message.trim() }];
  } else {
    return new Response(JSON.stringify({ error: "Message required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (conversationMessages.length === 0) {
    return new Response(JSON.stringify({ error: "Message required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const client = new Anthropic({ apiKey });

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: getSystemPrompt(locale),
    messages: conversationMessages,
  });

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
