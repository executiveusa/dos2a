// Shared types for DOS2A platform

export type UserRole = "DJ" | "CLIENT" | "ENGINEER" | "PROMOTER" | "ADMIN"
export type SubscriptionTier = "FREE" | "STARTER" | "PRO" | "ENTERPRISE"
export type BookingStatus =
  | "PENDING"
  | "QUOTED"
  | "ACCEPTED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "DISPUTED"

export interface DjProfile {
  id: string
  userId: string
  username: string
  name: string
  avatarUrl?: string
  coverUrl?: string
  bio?: string
  genres: string[]
  equipment: string[]
  portfolio: PortfolioItem[]
  hourlyRate: number
  minHours: number
  yearsExp: number
  city?: string
  country: string
  rating: number
  reviewCount: number
  bookingCount: number
  featured: boolean
  verified: boolean
  available: boolean
  socialLinks: SocialLinks
}

export interface PortfolioItem {
  id: string
  title: string
  description?: string
  imageUrl?: string
  videoUrl?: string
  eventDate?: string
  eventType?: string
}

export interface SocialLinks {
  instagram?: string
  soundcloud?: string
  spotify?: string
  youtube?: string
  website?: string
}

export interface BookingRequest {
  djId: string
  eventDate: string
  duration: number
  location: string
  eventType: string
  guestCount: number
  notes?: string
}

export interface Quote {
  bookingId: string
  djId: string
  clientId: string
  grossAmount: number
  platformFee: number
  djPayout: number
  duration: number
  eventDate: string
  expiresAt: string
  message?: string
}

export interface TeamMember {
  userId: string
  name: string
  role: string
  revenueSplit: number
}

export interface AgentInput {
  type: AgentType
  userId?: string
  payload: Record<string, unknown>
}

export type AgentType =
  | "booking"
  | "gear"
  | "promotion"
  | "collaboration"
  | "payment"
  | "communication"

export interface AgentResult {
  success: boolean
  data?: Record<string, unknown>
  message?: string
  error?: string
  tokensUsed?: { input: number; output: number }
}

export const SUBSCRIPTION_PRICES = {
  FREE: 0,
  STARTER: 2900,
  PRO: 9900,
  ENTERPRISE: 29900
} as const

export const GENRES = [
  "House",
  "Techno",
  "Latin",
  "Hip-Hop",
  "R&B",
  "EDM",
  "Reggaeton",
  "Salsa",
  "Cumbia",
  "Pop",
  "Rock",
  "Funk",
  "Jazz",
  "Trap",
  "Afrobeats"
] as const

export type Genre = (typeof GENRES)[number]

export const GEAR_CATEGORIES = [
  "Sound System",
  "DJ Controller",
  "CDJ",
  "Mixer",
  "Speakers",
  "Subwoofers",
  "Amplifier",
  "Microphone",
  "Lighting",
  "Fog Machine",
  "Cable Harness",
  "Stage Monitor"
] as const

export type GearCategory = (typeof GEAR_CATEGORIES)[number]
