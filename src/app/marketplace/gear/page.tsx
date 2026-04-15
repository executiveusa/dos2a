"use client"

import { useEffect, useState } from "react"
import { GEAR_CATEGORIES } from "@/types"

interface GearListing {
  id: string
  name: string
  category: string
  description?: string
  condition: string
  dailyRate: number
  available: boolean
  imageUrl?: string
  location?: string
  owner: { name: string; username?: string; avatarUrl?: string }
}

const CONDITION_LABELS: Record<string, string> = {
  EXCELLENT: "Excellent",
  GOOD: "Good",
  FAIR: "Fair"
}

export default function MarketplaceGearPage() {
  const [items, setItems] = useState<GearListing[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("")
  const [maxRate, setMaxRate] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function fetchGear() {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: "12" })
    if (category) params.set("category", category)
    if (maxRate) params.set("maxRate", maxRate)
    const res = await fetch(`/api/marketplace/gear?${params}`)
    const data = await res.json()
    setItems(data.items ?? [])
    setTotal(data.total ?? 0)
    setTotalPages(data.totalPages ?? 1)
    setLoading(false)
  }

  useEffect(() => { fetchGear() }, [category, maxRate, page]) // eslint-disable-line

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-50">Gear Marketplace</h1>
        <p className="mt-2 text-slate-400">{total} items available for rent</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filters */}
        <aside className="w-full shrink-0 lg:w-56">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-5 space-y-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full rounded-sm px-3 py-1.5 text-left text-sm transition-colors ${
                    !category ? "text-brand-purple" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  All categories
                </button>
                {GEAR_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`w-full rounded-sm px-3 py-1.5 text-left text-sm transition-colors ${
                      category === c ? "text-brand-purple" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Max rate ($/day)
              </label>
              <input
                type="number"
                value={maxRate}
                onChange={(e) => { setMaxRate(e.target.value); setPage(1) }}
                placeholder="Any"
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
              />
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-slate-800 bg-slate-900/60 h-52" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center text-slate-400">No gear matches your filters.</div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-slate-800 bg-slate-900/60 p-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-100">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                      <span className="shrink-0 rounded-sm border border-slate-700 px-2 py-0.5 text-xs text-slate-400">
                        {CONDITION_LABELS[item.condition] ?? item.condition}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">{item.description}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-slate-400">
                        By <span className="text-slate-300">{item.owner.name}</span>
                      </p>
                      <p className="font-semibold text-slate-100">
                        ${item.dailyRate}
                        <span className="text-xs font-normal text-slate-500">/day</span>
                      </p>
                    </div>
                    <button className="mt-4 w-full rounded-md border border-brand-purple/40 bg-brand-purple/10 py-2 text-sm font-medium text-brand-purple transition-colors hover:bg-brand-purple/20">
                      Request rental
                    </button>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                    className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-400 disabled:opacity-40">Previous</button>
                  <span className="text-sm text-slate-500">{page} / {totalPages}</span>
                  <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
                    className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-400 disabled:opacity-40">Next</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
