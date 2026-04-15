import { NextRequest, NextResponse } from "next/server"
import { routeAgent } from "@/lib/agents/router"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"
import type { AgentType } from "@/types"

const schema = z.object({
  type: z.enum(["booking", "gear", "promotion", "collaboration", "payment", "communication"]).optional(),
  payload: z.record(z.unknown())
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const userId = (session.user as { id?: string }).id

  const result = await routeAgent({
    type: parsed.data.type as AgentType,
    userId,
    payload: parsed.data.payload
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json(result.data)
}
