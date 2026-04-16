// Translations — Spanish first, English second
// Used by useLanguage() hook throughout the app

export type Lang = "es" | "en";

export const translations = {
  nav: {
    services: { es: "Servicios", en: "Services" },
    portfolio: { es: "Montajes", en: "Portfolio" },
    process: { es: "Proceso", en: "Process" },
    pricing: { es: "Paquetes", en: "Packages" },
    contact: { es: "Cotizar", en: "Get Quote" },
    instagram: { es: "Instagram", en: "Instagram" },
  },
  hero: {
    badge: {
      es: "Ciudad de México · Audio · Iluminación · Producción",
      en: "Mexico City · Audio · Lighting · Production",
    },
    headline1: {
      es: "Haz que tu evento",
      en: "Make your event",
    },
    headline2: {
      es: "suene y se vea",
      en: "sound and look",
    },
    headline3: {
      es: "como un headliner.",
      en: "like a headliner.",
    },
    sub: {
      es: "Diseñamos montajes de audio, iluminación y producción audiovisual para eventos que necesitan impacto real.",
      en: "We design audio, lighting, and AV production setups for events that demand real impact.",
    },
    cta_primary: { es: "Cotiza tu evento", en: "Get a Quote" },
    cta_secondary: { es: "Ver montajes", en: "View Portfolio" },
    enter: { es: "Entrar", en: "Enter" },
    badge_response: { es: "Respuesta en 24h", en: "Response in 24h" },
    badge_ops: { es: "Montaje + Operación", en: "Setup + Operation" },
    badge_zone: { es: "CDMX y alrededores", en: "CDMX & surroundings" },
  },
  services: {
    kicker: { es: "Servicios", en: "Services" },
    title: {
      es: "Lo que necesita\nun evento serio.",
      en: "What a serious\nevent needs.",
    },
    intro: {
      es: "Cuatro áreas de especialización para que tu evento suene, se vea y funcione sin improvisaciones.",
      en: "Four areas of expertise so your event sounds, looks, and runs without improvisation.",
    },
    items: [
      {
        title: { es: "Audio profesional", en: "Professional audio" },
        copy: {
          es: "Sistemas de sonido diseñados para cobertura, intelligibilidad y presencia.",
          en: "Sound systems designed for coverage, intelligibility, and presence.",
        },
        bullets: {
          es: [
            "Diseño según formato y espacio",
            "Operación técnica durante el evento",
            "Setup para pista, voz o show híbrido",
          ],
          en: [
            "Design based on format and venue",
            "Technical operation during event",
            "Setup for dance floor, voice, or hybrid show",
          ],
        },
      },
      {
        title: { es: "Iluminación escénica", en: "Stage lighting" },
        copy: {
          es: "Atmósferas y dirección visual para que el montaje tenga carácter antes de que empiece el show.",
          en: "Atmospheres and visual direction so the setup has character before the show starts.",
        },
        bullets: {
          es: [
            "Diseño de atmósferas y escenas",
            "Resalte para pista, escenario o arquitectura",
            "Lectura premium para foto y video",
          ],
          en: [
            "Atmosphere and scene design",
            "Highlighting for floor, stage, or architecture",
            "Premium look for photo and video",
          ],
        },
      },
      {
        title: { es: "Producción audiovisual", en: "AV production" },
        copy: {
          es: "Integración de visuales, pantallas y coordinación técnica para que la experiencia sea completa.",
          en: "Visuals, screens, and technical coordination for a complete experience.",
        },
        bullets: {
          es: [
            "Señal visual con intención comercial",
            "Apoyo a presentaciones y branding",
            "Montaje limpio para eventos de marca",
          ],
          en: [
            "Visual signal with commercial intent",
            "Support for presentations and branding",
            "Clean setup for brand events",
          ],
        },
      },
      {
        title: { es: "Operación técnica", en: "Technical operation" },
        copy: {
          es: "No sólo se renta equipo: se cuida el detalle operativo para reducir errores y tiempos muertos.",
          en: "Not just equipment rental: we handle operational detail to reduce errors and downtime.",
        },
        bullets: {
          es: [
            "Coordinación de ejecución y tiempos",
            "Soporte durante el evento completo",
            "Brief técnico desde la cotización",
          ],
          en: [
            "Execution and timeline coordination",
            "Support throughout the entire event",
            "Technical brief from the quote stage",
          ],
        },
      },
    ],
  },
  packages: {
    kicker: { es: "Paquetes", en: "Packages" },
    title: {
      es: "Tres entradas\ncomerciales claras.",
      en: "Three clear\ncommercial options.",
    },
    intro: {
      es: "Cada paquete corresponde a un tipo de evento. Puedes combinar elementos según tu necesidad.",
      en: "Each package corresponds to an event type. Elements can be combined to fit your needs.",
    },
    featured_label: { es: "Más popular", en: "Most popular" },
    cta: { es: "Cotizar este paquete", en: "Quote this package" },
    items: [
      {
        label: { es: "Social", en: "Social" },
        title: {
          es: "Celebraciones privadas, bodas y fiestas.",
          en: "Private celebrations, weddings, and parties.",
        },
        copy: {
          es: "Montaje diseñado para lucir bien en el espacio real y en redes sociales.",
          en: "Setup designed to look great in the real space and on social media.",
        },
        bullets: {
          es: [
            "Audio para pista y momentos clave",
            "Iluminación de ambiente y acentos",
            "Montaje limpio para foto y video",
          ],
          en: [
            "Audio for dance floor and key moments",
            "Ambient lighting and accents",
            "Clean setup for photo and video",
          ],
        },
        featured: false,
      },
      {
        label: { es: "Escénico", en: "Scenic" },
        title: {
          es: "Conciertos, fiestas masivas y showcases.",
          en: "Concerts, large parties, and showcases.",
        },
        copy: {
          es: "Producción para impacto, energía y presencia cuando el evento necesita verse más grande.",
          en: "Production for impact, energy, and presence when the event needs to look bigger.",
        },
        bullets: {
          es: [
            "Diseño escénico con audio, luz y visuales",
            "Setup con lectura premium y momentos memorables",
            "Operación técnica durante la ejecución",
          ],
          en: [
            "Scenic design with audio, light, and visuals",
            "Premium setup with memorable moments",
            "Technical operation during execution",
          ],
        },
        featured: true,
      },
      {
        label: { es: "Corporativo", en: "Corporate" },
        title: {
          es: "Conferencias, activaciones y eventos de marca.",
          en: "Conferences, activations, and brand events.",
        },
        copy: {
          es: "Técnica que se ve precisa y no invade el mensaje de la marca.",
          en: "Tech that looks precise and doesn't overshadow the brand message.",
        },
        bullets: {
          es: [
            "Audio entendible para público y presentadores",
            "Visuales limpios y apoyo a contenidos",
            "Montaje sobrio con ejecución confiable",
          ],
          en: [
            "Intelligible audio for audience and presenters",
            "Clean visuals and content support",
            "Sober setup with reliable execution",
          ],
        },
        featured: false,
      },
    ],
  },
  process: {
    kicker: { es: "Proceso", en: "Process" },
    title: { es: "Una ruta clara\nhasta el evento.", en: "A clear route\nto your event." },
    intro: {
      es: "Cuatro pasos. Sin fricción. Sin decisiones innecesarias de tu parte.",
      en: "Four steps. Zero friction. No unnecessary decisions on your end.",
    },
    steps: [
      {
        title: { es: "Describe tu evento", en: "Describe your event" },
        copy: {
          es: "Fecha, tipo de evento, ubicación y qué tan potente o visual debe sentirse el montaje.",
          en: "Date, event type, location, and how powerful or visual the setup should feel.",
        },
      },
      {
        title: { es: "Definimos el alcance", en: "We define the scope" },
        copy: {
          es: "Traducimos la idea a una propuesta técnica con foco en audio, iluminación y necesidades visuales.",
          en: "We translate the idea into a technical proposal focused on audio, lighting, and visual needs.",
        },
      },
      {
        title: { es: "Ajustamos la propuesta", en: "We refine the proposal" },
        copy: {
          es: "Afinamos los elementos para que el montaje responda al tipo de experiencia y presupuesto.",
          en: "We refine the elements so the setup responds to the type of experience and budget.",
        },
      },
      {
        title: { es: "Ejecutamos el evento", en: "We execute the event" },
        copy: {
          es: "Montaje, operación y desmontaje con una lectura de servicio más premium que improvisada.",
          en: "Setup, operation, and teardown with a service-oriented approach rather than improvised.",
        },
      },
    ],
  },
  faq: {
    kicker: { es: "FAQ", en: "FAQ" },
    title: { es: "Preguntas\ncomunes.", en: "Common\nquestions." },
    items: [
      {
        q: {
          es: "¿Pueden ayudarme aunque no tenga claro el montaje?",
          en: "Can you help me even if I'm not sure about the setup?",
        },
        a: {
          es: "Sí. El formulario está pensado para capturar lo esencial y convertir una idea general en una propuesta técnica clara.",
          en: "Yes. The form is designed to capture the essentials and turn a general idea into a clear technical proposal.",
        },
      },
      {
        q: {
          es: "¿Solo rentan equipo o también operan durante el evento?",
          en: "Do you only rent equipment or also operate during the event?",
        },
        a: {
          es: "Ambos. Nuestra diferencia está en el montaje y la operación técnica, no sólo en la renta aislada del equipo.",
          en: "Both. Our difference is in the setup and technical operation, not just isolated equipment rental.",
        },
      },
      {
        q: {
          es: "¿La cotización se adapta al tipo de evento?",
          en: "Does the quote adapt to the type of event?",
        },
        a: {
          es: "Sí. Segmentamos entre eventos sociales, escénicos y corporativos para que la conversación arranque con el contexto correcto.",
          en: "Yes. We segment between social, scenic, and corporate events so the conversation starts with the right context.",
        },
      },
      {
        q: {
          es: "¿Trabajan fuera de CDMX?",
          en: "Do you work outside CDMX?",
        },
        a: {
          es: "Cubrimos Ciudad de México y área metropolitana. Para eventos fuera del área, consúltanos caso por caso.",
          en: "We cover Mexico City and the metropolitan area. For events outside the area, contact us case by case.",
        },
      },
      {
        q: {
          es: "¿Cuánto tiempo antes debo contactarlos?",
          en: "How far in advance should I contact you?",
        },
        a: {
          es: "Recomendamos mínimo 2-3 semanas para eventos medianos. Para conciertos o eventos grandes, 4-8 semanas.",
          en: "We recommend a minimum of 2-3 weeks for medium events. For concerts or large events, 4-8 weeks.",
        },
      },
    ],
  },
  contact: {
    kicker: { es: "Cotiza tu evento", en: "Get Your Quote" },
    title: { es: "Listo para\ncotizar.", en: "Ready to\nquote you." },
    sub: {
      es: "Comparte lo esencial. Respondemos en menos de 24 horas con una propuesta técnica.",
      en: "Share the essentials. We respond within 24 hours with a technical proposal.",
    },
    name_label: { es: "Nombre", en: "Name" },
    name_ph: { es: "Tu nombre completo", en: "Your full name" },
    email_label: { es: "Correo", en: "Email" },
    email_ph: { es: "tu@correo.com", en: "your@email.com" },
    event_type_label: { es: "Tipo de evento", en: "Event type" },
    event_type_ph: { es: "Selecciona...", en: "Select..." },
    event_types: {
      es: ["Concierto o showcase", "Fiesta grande", "Boda o evento social", "Corporativo o activación", "Otro"],
      en: ["Concert or showcase", "Large party", "Wedding or social event", "Corporate or activation", "Other"],
    },
    date_label: { es: "Fecha", en: "Date" },
    location_label: { es: "Ubicación", en: "Location" },
    location_ph: { es: "Ciudad / venue / zona", en: "City / venue / area" },
    guests_label: { es: "Asistentes estimados", en: "Estimated attendees" },
    guests_ph: { es: "Ej. 150 personas", en: "E.g. 150 people" },
    needs_label: { es: "¿Qué necesitas?", en: "What do you need?" },
    needs_ph: {
      es: "Cuéntanos si necesitas audio, iluminación, visuales, DJ setup, operación técnica o una mezcla.",
      en: "Tell us if you need audio, lighting, visuals, DJ setup, technical operation, or a mix.",
    },
    submit: { es: "Enviar solicitud", en: "Send request" },
    voice_prompt: { es: "O describe tu evento por voz", en: "Or describe your event by voice" },
    sending: { es: "Enviando...", en: "Sending..." },
    success: {
      es: "¡Solicitud enviada! Te contactaremos en menos de 24 horas.",
      en: "Request sent! We'll contact you within 24 hours.",
    },
    error: {
      es: "Ocurrió un error. Escríbenos directamente a 2audioiluminacion@gmail.com",
      en: "An error occurred. Write to us directly at 2audioiluminacion@gmail.com",
    },
    email_info: { es: "Correo", en: "Email" },
    coverage_info: { es: "Cobertura", en: "Coverage" },
    coverage_val: { es: "Ciudad de México y alrededores", en: "Mexico City and surroundings" },
    focus_info: { es: "Enfoque", en: "Focus" },
    focus_val: { es: "Audio, iluminación y producción audiovisual", en: "Audio, lighting, and AV production" },
  },
  footer: {
    tagline: { es: "Audio, iluminación y producción audiovisual", en: "Audio, lighting, and AV production" },
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
  },
} as const;

export type TranslationKey = keyof typeof translations;
