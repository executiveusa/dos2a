export type SiteLang = "es" | "en";

type Bilingual = { es: string; en: string };

export const siteContent = {
  brand: {
    name: "dos A",
    tagline: { es: "audio · iluminación · video", en: "audio · lighting · video" } as Bilingual,
  },
  nav: {
    services: { es: "Servicios", en: "Services" },
    events: { es: "Eventos", en: "Events" },
    portfolio: { es: "Portafolio", en: "Portfolio" },
    signal: { es: "dos A Señal", en: "dos A Signal" },
    quote: { es: "Cotizar", en: "Get a quote" },
  },
  hero: {
    eyebrow: {
      es: "Producción técnica para empresas, agencias y organizadores de eventos.",
      en: "Technical production for companies, agencies, and event organizers.",
    },
    title: {
      es: "Audio, video, iluminación y operación. Un solo equipo.",
      en: "Audio, video, lighting, and technical operation. One team.",
    },
    support: {
      es: "Diseñamos, coordinamos y operamos congresos, lanzamientos, activaciones, stands y experiencias de marca en Ciudad de México y proyectos en todo México.",
      en: "We design, coordinate, and operate conferences, launches, activations, stands, and brand experiences from Mexico City, with projects across Mexico.",
    },
    primary: { es: "Cotizar mi evento", en: "Get a quote" },
    secondary: { es: "Contar mi idea", en: "Describe my event" },
    proof: { es: "Más de 10 años de experiencia.", en: "More than 10 years of experience." },
  },
  journey: [
    {
      id: "scale",
      eyebrow: { es: "Producción técnica integral", en: "Integrated technical production" },
      title: { es: "Una producción. Un equipo responsable de que todo funcione.", en: "One production. One team accountable for making it work." },
      body: { es: "Audio, video, iluminación y operación coordinados desde el principio.", en: "Audio, video, lighting, and technical operation coordinated from the start." },
      image: "/images/projects/dosa-project-35.webp",
      alt: { es: "Producción de evento de gran escala con escenario y pantallas", en: "Large-scale event production with stage and screens" },
      position: "center 48%",
      mobilePosition: "58% center",
    },
    {
      id: "audio-video",
      eyebrow: { es: "Audio + video", en: "Audio + video" },
      title: { es: "Que todos escuchen. Que todos vean. Que el mensaje llegue.", en: "Make sure they hear it. See it. Understand it." },
      body: { es: "Sistemas, pantallas, contenido y operación definidos alrededor del espacio y del público.", en: "Sound, screens, content, and operation planned around the space and audience." },
      image: "/images/projects/dosa-project-20.webp",
      alt: { es: "Evento con múltiples pantallas y producción audiovisual", en: "Event with multiple screens and audiovisual production" },
      position: "center center",
      mobilePosition: "52% center",
    },
    {
      id: "lighting",
      eyebrow: { es: "Iluminación", en: "Lighting" },
      title: { es: "La atmósfera también se diseña.", en: "Atmosphere is designed, too." },
      body: { es: "La luz organiza el espacio, dirige la mirada y cambia cómo se siente un momento.", en: "Light organizes the space, guides attention, and changes how a moment feels." },
      image: "/images/projects/dosa-project-17.webp",
      alt: { es: "Salón de conferencia con iluminación ambiental", en: "Conference room with ambient lighting" },
      position: "center center",
      mobilePosition: "54% center",
    },
    {
      id: "stands",
      eyebrow: { es: "Escenarios + stands", en: "Stages + stands" },
      title: { es: "Del escenario al espacio completo.", en: "From the stage to the whole space." },
      body: { es: "Estructura, pantallas, iluminación y marca coordinadas como una sola experiencia física.", en: "Structure, screens, lighting, and brand elements coordinated as one physical experience." },
      image: "/images/projects/dosa-project-62.webp",
      alt: { es: "Stand de exposición de gran formato", en: "Large exhibition stand" },
      position: "center center",
      mobilePosition: "50% center",
    },
    {
      id: "experiences",
      eyebrow: { es: "Experiencias", en: "Experiences" },
      title: { es: "No entregamos piezas aisladas. Construimos experiencias completas.", en: "We do not deliver isolated pieces. We build complete experiences." },
      body: { es: "Cuando el proyecto lo pide, la tecnología, el espacio y la interacción trabajan juntos.", en: "When the project calls for it, technology, space, and interaction work together." },
      image: "/images/projects/dosa-project-54.webp",
      alt: { es: "Entrada circular para una experiencia de marca", en: "Circular entrance for a brand experience" },
      position: "center center",
      mobilePosition: "center center",
    },
    {
      id: "operation",
      eyebrow: { es: "Operación", en: "Operation" },
      title: { es: "El evento empieza antes de que llegue el público.", en: "The event starts before the audience arrives." },
      body: { es: "Alcance claro, pruebas, montaje y operación para llegar al momento importante con responsabilidades definidas.", en: "Clear scope, testing, setup, and operation so responsibilities are defined before the important moment." },
      image: "/images/projects/dosa-project-12.webp",
      alt: { es: "Montaje técnico para una conferencia", en: "Technical setup for a conference" },
      position: "center center",
      mobilePosition: "54% center",
    },
  ],
  audience: {
    title: { es: "Una forma de trabajar para proyectos donde la coordinación importa.", en: "A way of working for projects where coordination matters." },
    items: [
      { title: { es: "Empresas", en: "Companies" }, body: { es: "Congresos, reuniones, lanzamientos, convenciones y eventos internos donde el mensaje y la operación no pueden fallar.", en: "Conferences, meetings, launches, conventions, and internal events where message and operation both matter." } },
      { title: { es: "Agencias y productores", en: "Agencies and producers" }, body: { es: "Nos integramos a una producción mayor, respetamos el concepto creativo y nos hacemos responsables del alcance técnico acordado.", en: "We join a larger production, respect the creative concept, and own the agreed technical scope." } },
      { title: { es: "Marcas y activaciones", en: "Brands and activations" }, body: { es: "Pantallas, iluminación, stands, escenarios y experiencias para convertir una idea de marca en un espacio real.", en: "Screens, lighting, stands, stages, and experiences that turn a brand idea into a real space." } },
    ],
  },
  services: {
    title: { es: "La parte técnica de tu evento, coordinada de principio a fin.", en: "The technical side of your event, coordinated from start to finish." },
    intro: { es: "Podemos encargarnos de una necesidad específica o coordinar varias disciplinas como un solo equipo.", en: "We can handle one defined need or coordinate several disciplines as one team." },
    items: [
      { title: { es: "Audio", en: "Audio" }, body: { es: "Sonido y microfonía para voz, música, presentaciones y formatos híbridos según el espacio, aforo y dinámica.", en: "Sound and microphones for speech, music, presentations, and hybrid formats based on venue, audience, and flow." } },
      { title: { es: "Video y pantallas", en: "Video and screens" }, body: { es: "Pantallas LED, proyección, monitores, señal y apoyo a contenidos para presentaciones, escenarios, stands y experiencias.", en: "LED screens, projection, displays, signal, and content support for presentations, stages, stands, and experiences." } },
      { title: { es: "Iluminación", en: "Lighting" }, body: { es: "Iluminación escénica, ambiental y arquitectónica diseñada alrededor del espacio, la cámara y los momentos clave.", en: "Stage, ambient, and architectural lighting planned around the space, camera, and key moments." } },
      { title: { es: "Escenarios, stands y escenografía", en: "Stages, stands, and scenic environments" }, body: { es: "Estructuras y elementos físicos coordinados con pantallas, iluminación, branding y necesidades operativas.", en: "Physical structures and scenic elements coordinated with screens, lighting, branding, and operational needs." } },
      { title: { es: "Operación y coordinación", en: "Operation and coordination" }, body: { es: "Tiempos, montaje, pruebas, operación y desmontaje de nuestro alcance técnico con responsabilidades claras.", en: "Timing, setup, testing, operation, and teardown for our technical scope with clear responsibilities." } },
      { title: { es: "Requerimientos especiales", en: "Special requirements" }, body: { es: "Según el proyecto: traducción simultánea, cómputo, efectos, mapping, fotografía, grabación y otros requerimientos confirmados en la propuesta.", en: "Depending on the project: interpretation, computers, effects, mapping, photography, recording, and other requirements confirmed in the proposal." } },
    ],
  },
  process: {
    title: { es: "Cuéntanos qué quieres lograr. Nosotros aterrizamos la parte técnica.", en: "Tell us what you need to accomplish. We define the technical scope." },
    steps: [
      { n: "01", title: { es: "Cuéntanos tu evento", en: "Tell us about the event" }, body: { es: "Fecha, lugar, público, objetivo y lo que ya tienes definido.", en: "Date, venue, audience, objective, and what is already defined." } },
      { n: "02", title: { es: "Aterrizamos el alcance", en: "We define the scope" }, body: { es: "Identificamos qué necesita audio, video, iluminación, escenario, stand u operación.", en: "We identify what needs audio, video, lighting, staging, stands, or technical operation." } },
      { n: "03", title: { es: "Preparamos la propuesta", en: "We prepare the proposal" }, body: { es: "Presentamos el alcance y ajustamos lo necesario antes de confirmar.", en: "We present the scope and refine what is needed before confirmation." } },
      { n: "04", title: { es: "Producimos y operamos", en: "We produce and operate" }, body: { es: "Coordinamos montaje, pruebas, operación y desmontaje según el proyecto.", en: "We coordinate setup, testing, operation, and teardown for the project." } },
    ],
  },
  genio: {
    eyebrow: { es: "Brief del evento", en: "Event brief" },
    title: { es: "¿Todavía no sabes exactamente qué necesitas?", en: "Not sure exactly what you need yet?" },
    body: { es: "Cuéntanos la fecha, el lugar y la idea con tus propias palabras. Ordenaremos lo esencial para preparar el siguiente paso sin pedirte que conozcas términos técnicos.", en: "Share the date, place, and idea in your own words. We will organize the essentials for the next step without making you learn technical terms." },
    cta: { es: "Preparar mi brief", en: "Prepare my brief" },
  },
  quote: {
    title: { es: "Cuéntanos tu evento. Empecemos por lo esencial.", en: "Tell us about your event. Start with what you know." },
    body: { es: "No necesitas saber qué equipo pedir. Danos el contexto y te ayudamos a ordenar el alcance.", en: "You do not need to know which equipment to request. Give us the context and we will help organize the scope." },
  },
};