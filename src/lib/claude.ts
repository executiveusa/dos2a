import Anthropic from "@anthropic-ai/sdk"

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set")
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export const MODELS = {
  REASONING: "claude-sonnet-4-5",
  EXECUTION: "claude-haiku-4-5",
  COORDINATION: "claude-opus-4-5"
} as const

export async function callClaude(
  prompt: string,
  model: keyof typeof MODELS = "EXECUTION",
  systemPrompt?: string
): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
  const response = await anthropic.messages.create({
    model: MODELS[model],
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: "user", content: prompt }]
  })

  const text =
    response.content[0].type === "text" ? response.content[0].text : ""

  return {
    text,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens
  }
}
