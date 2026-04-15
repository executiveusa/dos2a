import { db } from "@/lib/db"
import type { AgentResult } from "@/types"

export interface GearRentalRequest {
  renterId: string
  gearItemId: string
  startDate: string
  endDate: string
  deliveryAddress?: string
}

export interface GearInventoryUpdate {
  gearItemId: string
  available: boolean
}

export async function gearAgent(
  request: GearRentalRequest
): Promise<AgentResult> {
  try {
    const gearItem = await db.gearItem.findUnique({
      where: { id: request.gearItemId },
      include: { owner: true }
    })

    if (!gearItem) {
      return { success: false, error: "Gear item not found" }
    }
    if (!gearItem.available) {
      return { success: false, error: "Gear item is not available" }
    }

    const start = new Date(request.startDate)
    const end = new Date(request.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (days < 1) {
      return { success: false, error: "Invalid rental period" }
    }

    const rentalTotal = gearItem.dailyRate * days * 100
    const platformFee = Math.round(rentalTotal * 0.05)
    const ownerPayout = rentalTotal - platformFee

    return {
      success: true,
      data: {
        gearItemId: gearItem.id,
        itemName: gearItem.name,
        ownerId: gearItem.ownerId,
        ownerName: gearItem.owner.name,
        days,
        dailyRate: gearItem.dailyRate,
        rentalTotal,
        platformFee,
        ownerPayout,
        startDate: request.startDate,
        endDate: request.endDate,
        deliveryAddress: request.deliveryAddress
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gear agent error"
    }
  }
}

export async function updateGearAvailability(
  update: GearInventoryUpdate
): Promise<AgentResult> {
  try {
    await db.gearItem.update({
      where: { id: update.gearItemId },
      data: { available: update.available }
    })
    return { success: true, data: { updated: true } }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gear availability update error"
    }
  }
}
