export type BookingStatus = "tentative" | "confirmed" | "cancelled" | "completed";
export type BookingType = "discovery_call" | "technical_visit" | "event";

export interface BookingSlot {
  id: string;
  tenantId: string;
  type: BookingType;
  status: BookingStatus;
  startsAt: string;
  endsAt: string;
  holdExpiresAt?: string;
  resourceKeys: string[];
}

export function rangesOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export function validateBookingSlot(slot: BookingSlot, now = new Date()): void {
  const start = new Date(slot.startsAt); const end = new Date(slot.endsAt);
  if (!Number.isFinite(start.valueOf()) || !Number.isFinite(end.valueOf()) || end <= start) throw new Error("invalid_booking_range");
  if (slot.status === "tentative") {
    if (!slot.holdExpiresAt) throw new Error("tentative_hold_requires_expiry");
    const expiry = new Date(slot.holdExpiresAt);
    if (!Number.isFinite(expiry.valueOf()) || expiry <= now || expiry > start) throw new Error("invalid_hold_expiry");
  }
  if (slot.resourceKeys.length > 50) throw new Error("too_many_resources");
}

export function conflicts(candidate: BookingSlot, existing: BookingSlot[]): BookingSlot[] {
  if (!["tentative", "confirmed"].includes(candidate.status)) return [];
  const keys = new Set(candidate.resourceKeys);
  return existing.filter(slot => {
    if (slot.tenantId !== candidate.tenantId || slot.id === candidate.id) return false;
    if (!["tentative", "confirmed"].includes(slot.status)) return false;
    if (!slot.resourceKeys.some(key => keys.has(key))) return false;
    return rangesOverlap(new Date(candidate.startsAt), new Date(candidate.endsAt), new Date(slot.startsAt), new Date(slot.endsAt));
  });
}
