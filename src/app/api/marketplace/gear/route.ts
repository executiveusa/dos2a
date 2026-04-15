import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const filterSchema = z.object({
  category: z.string().optional(),
  city: z.string().optional(),
  maxRate: z.coerce.number().optional(),
  condition: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12)
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const filters = filterSchema.parse(Object.fromEntries(searchParams))

  const where: Record<string, unknown> = {
    available: true,
    ...(filters.category && { category: filters.category }),
    ...(filters.condition && { condition: filters.condition }),
    ...(filters.maxRate !== undefined && { dailyRate: { lte: filters.maxRate } }),
    ...(filters.city && { location: { contains: filters.city, mode: "insensitive" } })
  }

  const [items, total] = await Promise.all([
    db.gearItem.findMany({
      where,
      include: {
        owner: { select: { name: true, username: true, avatarUrl: true } }
      },
      orderBy: { dailyRate: "asc" },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit
    }),
    db.gearItem.count({ where })
  ])

  return NextResponse.json({
    items,
    total,
    page: filters.page,
    totalPages: Math.ceil(total / filters.limit)
  })
}
