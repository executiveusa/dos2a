import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sora, Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const sora=Sora({subsets:["latin"],variable:"--font-sora",display:"swap",weight:["400","600","700"]});
const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap",weight:["400","500","600"]});

export const metadata:Metadata={
  title:{default:"dos A | Audio, video, iluminación y producción técnica para eventos",template:"%s | dos A"},
  description:"Producción técnica para empresas, agencias y organizadores: audio, video, iluminación, escenarios, stands y operación desde Ciudad de México para proyectos en México.",
  keywords:["producción técnica eventos México","audio para eventos CDMX","video y pantallas eventos","iluminación eventos","stands y escenarios","producción audiovisual México"],
  openGraph:{title:"dos A | audio · iluminación · video",description:"Audio, video, iluminación y operación. Un solo equipo.",type:"website",locale:"es_MX"},
};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="es" className={`${sora.variable} ${inter.variable}`}><body><LanguageProvider>{children}</LanguageProvider></body></html>}
