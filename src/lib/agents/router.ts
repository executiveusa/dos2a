import { callClaude } from "@/lib/claude"
import { bookingAgent } from "./booking-agent"
import { gearAgent } from "./gear-agent"
import { promotionAgent } from "./promotion-agent"
import { collaborationAgent } from "./collaboration-agent"
import { paymentAgent } from "./payment-agent"
import { communicationAgent } from "./communication-agent"
import type { AgentInput, AgentResult } from "@/types"

export async function routeAgent(input: AgentInput): Promise<AgentResult> {
  try {
    if (!input.type) {
      const routingPrompt = `
You are a router for DOS2A platform agents.
Available agents: booking, gear, promotion, collaboration, payment, communication

Given this payload, which agent should handle it?
${JSON.stringify(input.payload)}

Return ONLY the agent name (one word).
`
      const { text } = await callClaude(routingPrompt, "EXECUTION")
      const detectedType = text.trim().toLowerCase()
      const validTypes = ["booking", "gear", "promotion", "collaboration", "payment", "communication"]
      if (validTypes.includes(detectedType)) {
        input.type = detectedType as AgentInput["type"]
      } else {
        return { success: false, error: "Could not determine agent type" }
      }
    }

    switch (input.type) {
      case "booking":
        return bookingAgent(input.payload as unknown as Parameters<typeof bookingAgent>[0])
      case "gear":
        return gearAgent(input.payload as unknown as Parameters<typeof gearAgent>[0])
      case "promotion":
        return promotionAgent(input.payload as unknown as Parameters<typeof promotionAgent>[0])
      case "collaboration":
        return collaborationAgent(input.payload as unknown as Parameters<typeof collaborationAgent>[0])
      case "payment":
        return paymentAgent(input.payload as unknown as Parameters<typeof paymentAgent>[0])
      case "communication":
        return communicationAgent(input.payload as unknown as Parameters<typeof communicationAgent>[0])
      default:
        return { success: false, error: `Unknown agent type: ${input.type}` }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Router error"
    }
  }
}
