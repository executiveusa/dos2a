import ServiceDetailPage from "@/components/site/ServiceDetailPage";
import { siteContent } from "@/lib/site-content";
export const metadata={alternates:{canonical:"/servicios/escenarios"},title:"Escenarios, stands y escenografía",description:"Escenarios, stands y escenografía coordinados con pantallas, iluminación, branding y operación. Diseño según venue. CDMX y todo México."};
const s=siteContent.servicePages.escenarios;
const ld={"@context":"https://schema.org","@graph":[
{"@type":"Service",name:"Escenarios, stands y escenografía",serviceType:"Escenarios, stands y escenografía para eventos",provider:{"@type":"Organization",name:"dos A"},areaServed:[{"@type":"City",name:"Ciudad de México"},{"@type":"Country",name:"México"}]},
{"@type":"FAQPage",mainEntity:s.faq.map(f=>({"@type":"Question",name:f.q.es,acceptedAnswer:{"@type":"Answer",text:f.a.es}}))},
{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Inicio",item:"https://dos2a.vercel.app/"},{"@type":"ListItem",position:2,name:"Servicios",item:"https://dos2a.vercel.app/servicios"},{"@type":"ListItem",position:3,name:"Escenarios y stands"}]}
]};
export default function Page(){return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/><ServiceDetailPage slug="escenarios"/></>}
