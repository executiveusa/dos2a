import { db } from "@/lib/db"
import type { AgentResult, TeamMember } from "@/types"

export interface TeamCreationRequest {
  name: string
  description?: string
  createdById: string
  members: TeamMember[]
}

export interface RevenueSplitRequest {
  teamId: string
  bookingId: string
  totalAmount: number
}

export async function collaborationAgent(
  request: TeamCreationRequest
): Promise<AgentResult> {
  try {
    const totalSplit = request.members.reduce(
      (sum, m) => sum + m.revenueSplit,
      0
    )
    if (totalSplit !== 100) {
      return {
        success: false,
        error: `Revenue splits must sum to 100. Current sum: ${totalSplit}`
      }
    }

    const team = await db.team.create({
      data: {
        name: request.name,
        description: request.description,
        createdById: request.createdById,
        members: {
          create: request.members.map((m) => ({
            userId: m.userId,
            role: m.role,
            revenueSplit: m.revenueSplit
          }))
        }
      },
      include: { members: { include: { user: true } } }
    })

    return {
      success: true,
      data: {
        teamId: team.id,
        teamName: team.name,
        memberCount: team.members.length
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Collaboration agent error"
    }
  }
}

export async function calculateRevenueSplits(
  request: RevenueSplitRequest
): Promise<AgentResult> {
  try {
    const team = await db.team.findUnique({
      where: { id: request.teamId },
      include: { members: { include: { user: true } } }
    })

    if (!team) {
      return { success: false, error: "Team not found" }
    }

    const splits = team.members.map((member) => ({
      userId: member.userId,
      userName: member.user.name,
      role: member.role,
      splitPercentage: member.revenueSplit,
      amount: Math.round(request.totalAmount * (member.revenueSplit / 100))
    }))

    return {
      success: true,
      data: {
        teamId: request.teamId,
        bookingId: request.bookingId,
        totalAmount: request.totalAmount,
        splits
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Revenue split error"
    }
  }
}
