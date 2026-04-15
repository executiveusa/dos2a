"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

const NAV_LINKS = [
  { href: "/marketplace/djs", label: "Find DJs" },
  { href: "/marketplace/gear", label: "Gear" },
  { href: "#pricing", label: "Pricing" }
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-bold text-slate-50 shrink-0 tracking-tight"
        >
          DOS<span className="text-brand-purple">2A</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-slate-100"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <>
              <Link
                href="/bookings"
                className="hidden text-sm text-slate-400 hover:text-slate-200 md:inline-flex"
              >
                Bookings
              </Link>
              <Link
                href="/analytics"
                className="hidden text-sm text-slate-400 hover:text-slate-200 md:inline-flex"
              >
                Analytics
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-sm font-medium text-slate-300 hover:border-slate-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium text-slate-400 hover:text-slate-200 md:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-brand-purple px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-purple/90 transition-colors"
              >
                Get started
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="rounded-md p-1.5 text-slate-400 hover:text-slate-200 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {menuOpen ? (
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200"
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <>
                <Link href="/bookings" onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-slate-400 hover:text-slate-200">Bookings</Link>
                <Link href="/analytics" onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-slate-400 hover:text-slate-200">Analytics</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
