"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { GENRES, GEAR_CATEGORIES } from "@/types"

interface DjListing {
  id: string
  name: string
  username?: string
  avatarUrl?: string
  location?: string
  djProfile: {
    genres: string[]
    hourlyRate: number
    rating: number
    reviewCount: number
    featured: boolean
    verified: boolean
    city?: string
  } | null
}

const GENRE_OPTIONS = GENRES.slice()

export default function MarketplaceDjsPage() {
  const [djs, setDjs] = useState<DjListing[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [city, setCity] = useState("")
  const [maxRate, setMaxRate] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function fetchDjs() {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: "12" })
    if (selectedGenres.length) params.set("genres", selectedGenres.join(","))
    if (city) params.set("city", city)
    if (maxRate) params.set("maxRate", maxRate)

    const res = await fetch(`/api/marketplace/djs?${params}`)
    const data = await res.json()
    setDjs(data.djs ?? [])
    setTotal(data.total ?? 0)
    setTotalPages(data.totalPages ?? 1)
    setLoading(false)
  }

  useEffect(() => {
    fetchDjs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenres, city, maxRate, page])

  function toggleGenre(g: string) {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    )
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-50">Find a DJ</h1>
        <p className="mt-2 text-slate-400">{total} DJs available</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filters sidebar */}
        <aside className="w-full shrink-0 lg:w-56">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-5 space-y-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => { setCity(e.target.value); setPage(1) }}
                placeholder="e.g. CDMX"
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Max rate ($/hr)
              </label>
              <input
                type="number"
                value={maxRate}
                onChange={(e) => { setMaxRate(e.target.value); setPage(1) }}
                placeholder="Any"
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                Genre
              </label>
              <div className="space-y-1.5">
                {GENRE_OPTIONS.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`w-full rounded-sm px-3 py-1.5 text-left text-sm transition-colors ${
                      selectedGenres.includes(g)
                        ? "bg-brand-purple/20 text-brand-purple"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-slate-800 bg-slate-900/60 h-64" />
              ))}
            </div>
          ) : djs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-slate-400">No DJs match your filters.</p>
              <button
                onClick={() => { setSelectedGenres([]); setCity(""); setMaxRate("") }}
                className="mt-4 text-sm text-brand-purple hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {djs.map((dj) => (
                  <DjCard key={dj.id} dj={dj} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-400 disabled:opacity-40 hover:border-slate-600"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-500">
                    {page} / {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-400 disabled:opacity-40 hover:border-slate-600"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function DjCard({ dj }: { dj: DjListing }) {
  const profile = dj.djProfile
  return (
    <Link
      href={`/profile/${dj.username ?? dj.id}`}
      className="group block rounded-lg border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:border-brand-purple/40 hover:bg-slate-900"
    >
      <div className="flex items-start gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-800">
          {dj.avatarUrl ? (
            <Image src={dj.avatarUrl} alt={dj.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-600">
              {dj.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-semibold text-slate-100">{dj.name}</p>
            {profile?.verified && (
              <span className="shrink-0 text-brand-cyan">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0Zm3.3 5.2-3.8 3.8a.7.7 0 0 1-1 0L3.7 7.2a.7.7 0 0 1 1-1L6 7.5l3.3-3.3a.7.7 0 1 1 1 1Z" />
                </svg>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">{profile?.city ?? dj.location ?? "Mexico"}</p>
        </div>
        {profile?.featured && (
          <span className="ml-auto shrink-0 rounded-sm bg-brand-purple/20 px-2 py-0.5 text-xs font-medium text-brand-purple">
            Featured
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {profile?.genres.slice(0, 3).map((g) => (
          <span
            key={g}
            className="rounded-sm border border-slate-700 px-2 py-0.5 text-xs text-slate-400"
          >
            {g}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 14 14" fill="currentColor">
            <path d="M7 1l1.8 3.7 4.2.6-3 2.9.7 4.1L7 10.2l-3.7 2 .7-4.1-3-2.9 4.1-.6z" />
          </svg>
          <span className="text-xs text-slate-400">
            {profile?.rating.toFixed(1) ?? "—"} ({profile?.reviewCount ?? 0})
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-200">
          ${profile?.hourlyRate ?? 0}
          <span className="text-xs font-normal text-slate-500">/hr</span>
        </p>
      </div>
    </Link>
  )
}
