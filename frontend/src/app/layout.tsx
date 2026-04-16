import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "DOS2A — Audio, Iluminación y Producción Audiovisual CDMX",
  description:
    "Diseño de montajes para conciertos, fiestas y eventos corporativos en Ciudad de México. Audio profesional, iluminación escénica y producción audiovisual.",
  keywords: [
    "renta de audio CDMX",
    "iluminación eventos",
    "producción audiovisual México",
    "DJ equipment rental",
    "audio para conciertos",
  ],
  openGraph: {
    title: "DOS2A — Audio, Iluminación y Producción",
    description: "Montajes de audio e iluminación para eventos que quieren verse y escucharse como headliners.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080a0e" />
      </head>
      <body
        style={{
          background: "#080a0e",
          color: "#f1f5f9",
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
