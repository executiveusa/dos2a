import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db } from "@/lib/db"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: z.enum(["CLIENT", "DJ", "ENGINEER", "PROMOTER"]).default("CLIENT")
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 422 }
    )
  }

  const { name, email, password, role } = parsed.data

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 })
  }

  const hashedPassword = await hash(password, 12)

  const user = await db.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
      role,
      tier: "FREE"
    },
    select: { id: true, email: true, name: true, role: true }
  })

  return NextResponse.json({ user }, { status: 201 })
}
