import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface DjProfilePageProps {
  params: Promise<{ username: string }>
}

async function getProfile(username: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  const res = await fetch(`${base}/api/profiles/${username}`, {
    next: { revalidate: 60 }
  })
  if (!res.ok) return null
  return res.json()
}

export default async function DjProfilePage({ params }: DjProfilePageProps) {
  const { username } = await params
  const data = await getProfile(username)

  if (!data) notFound()

  const profile = data.djProfile

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Profile header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-800">
            {data.avatarUrl ? (
              <Image src={data.avatarUrl} alt={data.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-600">
                {data.name?.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-slate-50">{data.name}</h1>
              {profile?.verified && (
                <span className="rounded-full bg-brand-cyan/10 px-2 py-0.5 text-xs font-medium text-brand-cyan">
                  Verified
                </span>
              )}
              {profile?.featured && (
                <span className="rounded-full bg-brand-purple/10 px-2 py-0.5 text-xs font-medium text-brand-purple">
                  Featured
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {profile?.city ?? data.location ?? "Mexico"} · {profile?.yearsExp ?? 0} years experience
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
              {data.bio ?? profile?.bio ?? "DJ profile coming soon."}
            </p>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {profile?.genres?.map((g: string) => (
                <span key={g} className="rounded-sm border border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-display text-3xl font-bold text-slate-50">
              ${profile?.hourlyRate ?? 0}
              <span className="text-sm font-normal text-slate-500">/hr</span>
            </p>
            <div className="mt-1 flex items-center justify-end gap-1">
              <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 1l1.8 3.7 4.2.6-3 2.9.7 4.1L7 10.2l-3.7 2 .7-4.1-3-2.9 4.1-.6z" />
              </svg>
              <span className="text-sm text-slate-400">
                {(profile?.rating ?? 0).toFixed(1)} ({data.reviewCount} reviews)
              </span>
            </div>
            <Link
              href={`/book/${username}`}
              className="mt-4 inline-block rounded-md bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90"
            >
              Book now
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Equipment */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="font-display text-lg font-semibold text-slate-100">Equipment</h2>
          <ul className="mt-4 space-y-2">
            {profile?.equipment?.length ? (
              profile.equipment.map((e: string) => (
                <li key={e} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                  {e}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-600">No equipment listed</li>
            )}
          </ul>
        </div>

        {/* Stats */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="font-display text-lg font-semibold text-slate-100">Stats</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Gigs completed</span>
              <span className="font-medium text-slate-200">{profile?.bookingCount ?? 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Rating</span>
              <span className="font-medium text-slate-200">{(profile?.rating ?? 0).toFixed(1)} / 5.0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Reviews</span>
              <span className="font-medium text-slate-200">{data.reviewCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Min hours</span>
              <span className="font-medium text-slate-200">{profile?.minHours ?? 2}h</span>
            </div>
          </div>
        </div>

        {/* Availability CTA */}
        <div className="rounded-xl border border-brand-purple/20 bg-brand-purple/5 p-6">
          <h2 className="font-display text-lg font-semibold text-slate-100">Ready to book?</h2>
          <p className="mt-2 text-sm text-slate-400">
            Get an automated quote in under 60 seconds. No back-and-forth.
          </p>
          <Link
            href={`/book/${username}`}
            className="mt-5 block rounded-md bg-brand-purple py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-brand-purple/90"
          >
            Request booking
          </Link>
          <p className="mt-2 text-center text-xs text-slate-600">Quote valid for 48 hours</p>
        </div>
      </div>

      {/* Portfolio */}
      {profile?.portfolio?.length > 0 && (
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="font-display text-lg font-semibold text-slate-100 mb-4">Portfolio</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.portfolio.map((item: { id: string; title: string; eventType?: string; eventDate?: string; description?: string }) => (
              <div key={item.id} className="rounded-lg border border-slate-800 p-4">
                <p className="font-medium text-slate-200">{item.title}</p>
                {item.eventType && <p className="text-xs text-slate-500 mt-1">{item.eventType}</p>}
                {item.description && <p className="text-xs text-slate-400 mt-2 line-clamp-2">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
