import ServiceDetailPage from "@/components/site/ServiceDetailPage";
import { siteContent } from "@/lib/site-content";
export const metadata={alternates:{canonical:"/servicios/audio"},title:"Audio para eventos",description:"Sonido y microfonía dimensionados al espacio, el aforo y el programa. Sistema de audio, operador incluido y prueba de sonido. CDMX y todo México."};
const s=siteContent.servicePages.audio;
const ld={"@context":"https://schema.org","@graph":[
{"@type":"Service",name:"Audio para eventos",serviceType:"Sonido y microfonía para eventos",provider:{"@type":"Organization",name:"dos A"},areaServed:[{"@type":"City",name:"Ciudad de México"},{"@type":"Country",name:"México"}]},
{"@type":"FAQPage",mainEntity:s.faq.map(f=>({"@type":"Question",name:f.q.es,acceptedAnswer:{"@type":"Answer",text:f.a.es}}))},
{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Inicio",item:"https://dos2a.vercel.app/"},{"@type":"ListItem",position:2,name:"Servicios",item:"https://dos2a.vercel.app/servicios"},{"@type":"ListItem",position:3,name:"Audio"}]}
]};
export default function Page(){return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/><ServiceDetailPage slug="audio"/></>}
