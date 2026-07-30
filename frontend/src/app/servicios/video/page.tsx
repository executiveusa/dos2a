import ServiceDetailPage from "@/components/site/ServiceDetailPage";
import { siteContent } from "@/lib/site-content";
export const metadata={alternates:{canonical:"/servicios/video"},title:"Video y pantallas LED",description:"Pantallas LED, proyección, monitores y señal coordinados con tu contenido y tu programa. Pitch correcto para tu aforo. CDMX y todo México."};
const s=siteContent.servicePages.video;
const ld={"@context":"https://schema.org","@graph":[
{"@type":"Service",name:"Video y pantallas para eventos",serviceType:"Pantallas LED, proyección y video mapping",provider:{"@type":"Organization",name:"dos A"},areaServed:[{"@type":"City",name:"Ciudad de México"},{"@type":"Country",name:"México"}]},
{"@type":"FAQPage",mainEntity:s.faq.map(f=>({"@type":"Question",name:f.q.es,acceptedAnswer:{"@type":"Answer",text:f.a.es}}))},
{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Inicio",item:"https://dos2a.vercel.app/"},{"@type":"ListItem",position:2,name:"Servicios",item:"https://dos2a.vercel.app/servicios"},{"@type":"ListItem",position:3,name:"Video y pantallas"}]}
]};
export default function Page(){return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/><ServiceDetailPage slug="video"/></>}
