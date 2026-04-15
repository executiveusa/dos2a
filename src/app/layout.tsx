import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "DOS2A — DJ & Musician Booking Platform",
  description:
    "Where DJs, sound engineers, and musicians book gigs, manage gear, collaborate, and get paid.",
  keywords: ["DJ", "booking", "music", "CDMX", "events", "sound engineer"],
  openGraph: {
    title: "DOS2A",
    description: "The musician's booking & collaboration platform",
    type: "website"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
