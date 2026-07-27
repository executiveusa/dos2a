import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sora, Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const sora=Sora({subsets:["latin"],variable:"--font-sora",display:"swap",weight:["400","600","700"]});
const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap",weight:["400","500","600"]});

export const metadata:Metadata={
  metadataBase:new URL("https://dos2a.vercel.app"),
  alternates:{canonical:"/"},
  title:{default:"dos A | Audio, video, iluminación y producción técnica para eventos",template:"%s | dos A"},
  description:"Producción técnica para empresas, agencias y organizadores: audio, video, iluminación, escenarios, stands y operación desde Ciudad de México para proyectos en México.",
  openGraph:{title:"dos A | audio · iluminación · video",description:"Audio, video, iluminación y operación. Un solo equipo.",type:"website",locale:"es_MX",images:[{url:"/images/hero/dosa-hero-loreal-1920w.jpg",width:1920,height:1052,alt:"Gala corporativa producida por dos A"}]},
};
const jsonLd={
  "@context":"https://schema.org",
  "@type":["Organization","LocalBusiness"],
  name:"dos A",
  url:"https://dos2a.vercel.app",
  logo:"https://dos2a.vercel.app/images/dos-a-logo.svg",
  slogan:"audio · iluminación · video",
  description:"Producción técnica para empresas, agencias y organizadores: audio, video, iluminación, escenarios, stands y operación desde Ciudad de México para proyectos en México.",
  areaServed:[{"@type":"City",name:"Ciudad de México"},{"@type":"Country",name:"México"}],
  knowsAbout:["audio para eventos","video y pantallas LED","iluminación escénica y arquitectónica","escenarios y stands","video mapping","producción técnica de eventos"],
  makesOffer:[
    {"@type":"Offer",itemOffered:{"@type":"Service",name:"Audio para eventos"}},
    {"@type":"Offer",itemOffered:{"@type":"Service",name:"Video y pantallas LED"}},
    {"@type":"Offer",itemOffered:{"@type":"Service",name:"Iluminación para eventos"}},
    {"@type":"Offer",itemOffered:{"@type":"Service",name:"Escenarios, stands y escenografía"}},
    {"@type":"Offer",itemOffered:{"@type":"Service",name:"Operación y coordinación técnica de eventos"}}
  ]
};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="es" className={`${sora.variable} ${inter.variable}`}><body><LanguageProvider>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></LanguageProvider></body></html>}
