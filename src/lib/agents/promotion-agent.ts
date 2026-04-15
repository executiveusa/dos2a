import { callClaude } from "@/lib/claude"
import { db } from "@/lib/db"
import type { AgentResult } from "@/types"

export interface PromotionRequest {
  eventType: string
  genres: string[]
  location: string
  eventDate: string
  guestCount: number
  budget?: number
  limit?: number
}

export async function promotionAgent(
  request: PromotionRequest
): Promise<AgentResult> {
  try {
    const candidates = await db.user.findMany({
      where: {
        role: "DJ",
        djProfile: {
          available: true,
          genres: { hasSome: request.genres },
          city: request.location
        }
      },
      include: { djProfile: true },
      take: 20
    })

    if (candidates.length === 0) {
      const allDjs = await db.user.findMany({
        where: { role: "DJ", djProfile: { available: true } },
        include: { djProfile: true },
        take: 20
      })
      if (allDjs.length === 0) {
        return { success: false, error: "No available DJs found" }
      }

      const djSummaries = allDjs
        .map(
          (dj) =>
            `${dj.name}: genres=[${dj.djProfile?.genres.join(", ")}], rate=$${dj.djProfile?.hourlyRate}/hr, rating=${dj.djProfile?.rating}/5, city=${dj.djProfile?.city}`
        )
        .join("\n")

      return rankDjs(djSummaries, request, allDjs, request.limit ?? 5)
    }

    const djSummaries = candidates
      .map(
        (dj) =>
          `${dj.name}: genres=[${dj.djProfile?.genres.join(", ")}], rate=$${dj.djProfile?.hourlyRate}/hr, rating=${dj.djProfile?.rating}/5`
      )
      .join("\n")

    return rankDjs(djSummaries, request, candidates, request.limit ?? 5)
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Promotion agent error"
    }
  }
}

async function rankDjs(
  djSummaries: string,
  request: PromotionRequest,
  djs: { id: string; name: string; username?: string | null; djProfile: { rating: number; hourlyRate: number; genres: string[] } | null }[],
  limit: number
): Promise<AgentResult> {
  const prompt = `
You are a DJ recommendation engine for DOS2A platform.

Event details:
- Type: ${request.eventType}
- Genres wanted: ${request.genres.join(", ")}
- Location: ${request.location}
- Date: ${request.eventDate}
- Guests: ${request.guestCount}
- Budget: ${request.budget ? `$${request.budget}` : "flexible"}

Available DJs:
${djSummaries}

Rank the top ${limit} DJs for this event. Return ONLY a JSON array of user IDs in order of best match, like:
["id1", "id2", "id3"]
`

  const { text, inputTokens, outputTokens } = await callClaude(prompt, "EXECUTION")

  let rankedIds: string[] = []
  try {
    const match = text.match(/\[.*?\]/s)
    if (match) {
      rankedIds = JSON.parse(match[0])
    }
  } catch {
    rankedIds = djs.slice(0, limit).map((d) => d.id)
  }

  const ranked = rankedIds
    .map((id) => djs.find((d) => d.id === id))
    .filter(Boolean)

  return {
    success: true,
    data: { recommendations: ranked.map((dj) => dj!.id) },
    tokensUsed: { input: inputTokens, output: outputTokens }
  }
}
