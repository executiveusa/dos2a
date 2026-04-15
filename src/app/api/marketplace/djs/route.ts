import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const filterSchema = z.object({
  genres: z.string().optional(),
  city: z.string().optional(),
  minRate: z.coerce.number().optional(),
  maxRate: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  featured: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12)
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const filters = filterSchema.parse(Object.fromEntries(searchParams))

  const where: Record<string, unknown> = {
    role: "DJ",
    djProfile: {
      available: true,
      ...(filters.city && { city: { contains: filters.city, mode: "insensitive" } }),
      ...(filters.featured !== undefined && { featured: filters.featured }),
      ...(filters.minRate !== undefined || filters.maxRate !== undefined
        ? {
            hourlyRate: {
              ...(filters.minRate !== undefined && { gte: filters.minRate }),
              ...(filters.maxRate !== undefined && { lte: filters.maxRate })
            }
          }
        : {}),
      ...(filters.minRating !== undefined && { rating: { gte: filters.minRating } }),
      ...(filters.genres && {
        genres: { hasSome: filters.genres.split(",") }
      })
    }
  }

  const [djs, total] = await Promise.all([
    db.user.findMany({
      where,
      include: { djProfile: true },
      orderBy: [
        { djProfile: { featured: "desc" } },
        { djProfile: { rating: "desc" } },
        { djProfile: { bookingCount: "desc" } }
      ],
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit
    }),
    db.user.count({ where })
  ])

  return NextResponse.json({
    djs: djs.map((dj) => ({
      id: dj.id,
      name: dj.name,
      username: dj.username,
      avatarUrl: dj.avatarUrl,
      location: dj.location,
      djProfile: dj.djProfile
    })),
    total,
    page: filters.page,
    totalPages: Math.ceil(total / filters.limit)
  })
}
