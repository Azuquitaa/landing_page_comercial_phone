// export interface Plan {
//   id: string;
//   name: string;
//   price: string;
//   priceNote?: string;
//   features: string[];
//   benefits: string[];
//   recommended: boolean;
//   badge?: string;
//   category: "hogar" | "movil";
// }

export interface Plan {
  id: string;
  name: string;
  price: string;
  regularPrice?: string;
  promoText?: string;
  shortDescription?: string;

  priceNote?: string;
  features: string[];
  benefits: string[];
  recommended: boolean;
  badge?: string;
  category: "hogar" | "movil";
}

export interface Slide {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "hogar" | "movil" | "general";
}

export const initialPlansHogar: Plan[] = [
  {
    id: "h1",

    name: "Fibra Óptica",

    promoText: "200 MB",

    price: "$18.999",

    shortDescription: "Internet WiFi",

    priceNote: "por mes",

    features: [
      "Fibra óptica",
      "WiFi incluido",
      "Instalación sin cargo",
      "Primer mes gratis"
    ],

    benefits: [
      "Claro Video",
      "Paramount+",
      "HBO Max x2 meses",
      "Sin permanencia"
    ],

    recommended: false,
    category: "hogar",
  },

  {
    id: "h2",

    name: "Fibra Óptica",

    promoText: "500 MB",

    price: "$21.999",

    shortDescription: "Internet WiFi",

    priceNote: "por mes",

    features: [
      "Fibra óptica",
      "WiFi incluido",
      "Instalación sin cargo",
      "Primer mes gratis"
    ],

    benefits: [
      "Claro Video",
      "Paramount+",
      "HBO Max x2 meses",
      "Sin permanencia"
    ],

    recommended: true,
    badge: "Más Popular",
    category: "hogar",
  },

  {
    id: "h3",

    name: "Internet + TV",

    promoText: "200 MB",

    price: "$33.499",

    shortDescription: "122 canales incluidos",

    priceNote: "por mes",

    features: [
      "200 MB fibra",
      "TV Digital",
      "122 canales",
      "Instalación gratis"
    ],

    benefits: [
      "Claro Video",
      "Paramount+",
      "HBO Max x2 meses",
      "Sin permanencia"
    ],

    recommended: false,
    badge: "TV Incluida",
    category: "hogar",
  },

  {
    id: "h4",

    name: "Internet + TV",

    promoText: "800 MB",

    price: "$47.499",

    shortDescription: "122 canales incluidos",

    priceNote: "por mes",

    features: [
      "800 MB fibra",
      "TV Digital",
      "122 canales",
      "Instalación gratis"
    ],

    benefits: [
      "Claro Video",
      "Paramount+",
      "HBO Max x2 meses",
      "Sin permanencia"
    ],

    recommended: false,
    badge: "Premium",
    category: "hogar",
  },
];

export const initialPlansMovil: Plan[] = [
  {
    id: "m1",
    name: "Portabilidad Claro",

    promoText: "2 GB",

    price: "$11.900",
    regularPrice: "$34.000",

    shortDescription: "65% OFF por 6 meses",

    priceNote: "por mes",

    features: [
      "WhatsApp libre",
      "Llamadas ilimitadas",
      "SMS ilimitados",
      "Roaming incluido"
    ],

    benefits: [
      "Disney+ 1 mes",
      "Amazon Prime 1 mes",
      "Claro Música",
      "Claro Drive 25 GB"
    ],

    recommended: false,
    category: "movil",
  },

  {
    id: "m2",
    name: "Portabilidad Claro",

    promoText: "20 GB",

    price: "$43.237",
    regularPrice: "$123.534",

    shortDescription: "65% OFF por 6 meses",

    priceNote: "por mes",

    features: [
      "20 GB 4G/5G",
      "WhatsApp libre",
      "Llamadas ilimitadas",
      "Roaming incluido"
    ],

    benefits: [
      "Disney+ 1 mes",
      "Amazon Prime 1 mes",
      "Claro Música",
      "Claro Drive 25 GB"
    ],

    recommended: true,
    badge: "Más Elegido",
    category: "movil",
  },

  {
    id: "m3",
    name: "Portabilidad Claro",

    promoText: "30 GB",

    price: "$50.330",
    regularPrice: "$143.800",

    shortDescription: "65% OFF por 6 meses",

    priceNote: "por mes",

    features: [
      "30 GB 4G/5G",
      "WhatsApp libre",
      "Llamadas ilimitadas",
      "Roaming incluido"
    ],

    benefits: [
      "Disney+ 1 mes",
      "Amazon Prime 1 mes",
      "Claro Música",
      "Claro Drive 25 GB"
    ],

    recommended: false,
    badge: "Máximo",
    category: "movil",
  },

  {
    id: "m4",
    name: "Línea Nueva",

    promoText: "20 + 10 GB",

    price: "$23.421",

    shortDescription: "80% OFF por 1 año",

    priceNote: "por mes",

    features: [
      "30 GB totales",
      "WhatsApp libre",
      "Llamadas ilimitadas",
      "Roaming incluido"
    ],

    benefits: [
      "Disney+ 1 mes",
      "Amazon Prime 1 mes",
      "Claro Video",
      "Claro Drive 25 GB"
    ],

    recommended: false,
    badge: "Línea Nueva",
    category: "movil",
  },
];

export const initialSlides: Slide[] = [
  {
    id: "s1",
    icon: "Gift",
    title: "Promociones Exclusivas",
    description:
      "Accedé a descuentos especiales en portabilidad, líneas nuevas e internet hogar."
  },

  {
    id: "s2",
    icon: "Zap",
    title: "Activación Rápida",
    description:
      "Comenzá a disfrutar tu servicio en pocos pasos y sin complicaciones."
  },

  {
    id: "s3",
    icon: "Shield",
    title: "Roaming Incluido",
    description:
      "Mantenete conectado cuando viajes con beneficios incluidos según tu plan."
  },

  {
    id: "s4",
    icon: "Headphones",
    title: "Atención Personalizada",
    description:
      "Te acompañamos antes, durante y después de la contratación."
  },

  {
    id: "s5",
    icon: "Gift",
    title: "Más Entretenimiento",
    description:
      "Disfrutá beneficios como Disney+, Amazon Prime, Paramount+ y más."
  },

  {
    id: "s6",
    icon: "Tag",
    title: "Precios Promocionales",
    description:
      "Aprovechá descuentos por tiempo limitado y pagá menos durante más tiempo."
  },
];

export const initialFAQs: FAQ[] = [
  {
    id: "f1",
    question: "¿Cómo puedo contratar un plan?",
    answer: "Podés contratar tu plan completando el formulario de contacto en esta página, comunicándote por WhatsApp o llamándonos directamente. Un asesor te contactará a la brevedad para guiarte en el proceso.",
    category: "general",
  },
  {
    id: "f2",
    question: "¿Cuánto tarda la instalación del servicio de Hogar?",
    answer: "La instalación del servicio hogar se realiza en un plazo de 24 a 72 horas hábiles desde la aprobación del contrato. En zonas prioritarias podemos garantizar instalación en 24 horas.",
    category: "hogar",
  },
  {
    id: "f3",
    question: "¿Puedo portar mi número actual al contratar un plan Móvil?",
    answer: "Sí, realizamos la portabilidad numérica de forma completamente gratuita. El proceso demora entre 24 y 48 horas hábiles y podés usar tu número actual sin cambios.",
    category: "movil",
  },
  {
    id: "f4",
    question: "¿Los planes tienen permanencia mínima?",
    answer: "Los planes estándar tienen una permanencia mínima de 12 meses. Sin embargo, contamos con opciones sin permanencia disponibles bajo consulta con tu asesor comercial.",
    category: "general",
  },
  {
    id: "f5",
    question: "¿Qué pasa si necesito más datos en mi plan Móvil?",
    answer: "Podés comprar datos adicionales desde la app Mi Claro o solicitar un cambio de plan a uno superior. Los datos no utilizados se acumulan al mes siguiente en la mayoría de los planes.",
    category: "movil",
  },
  {
    id: "f6",
    question: "¿El servicio de internet Hogar incluye router WiFi?",
    answer: "Sí, todos los planes Hogar incluyen el router WiFi en comodato. Los planes Plus y superiores incluyen equipos de última generación con WiFi 6 para mayor velocidad y cobertura.",
    category: "hogar",
  },
  {
    id: "f7",
    question: "¿Puedo contratar múltiples líneas para mi empresa?",
    answer: "Absolutamente. Contamos con planes corporativos y de flota especialmente diseñados para empresas con múltiples líneas, con descuentos por volumen y gestión centralizada.",
    category: "movil",
  },
  {
    id: "f8",
    question: "¿Cómo se realiza el pago mensual?",
    answer: "El pago se realiza mensualmente por débito automático en tarjeta de crédito/débito o transferencia bancaria. Emitimos factura electrónica al correo registrado.",
    category: "general",
  },
];
