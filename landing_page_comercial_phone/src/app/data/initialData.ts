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
    id: "h2",
    name: "Hogar Plus",

    price: "$19.999",
    regularPrice: "$39.999",

    promoText: "200 MB",
    shortDescription: "Internet + Línea Fija con hasta 50% OFF",

    priceNote: "por mes",

    features: [
      "Internet 200 Mbps",
      "TV Claro 120 canales",
      "WiFi de alta velocidad",
      "Claro Video incluido"
    ],

    benefits: [
      "Instalación gratuita",
      "Router premium",
      "Soporte prioritario",
      "Sin costo de conexión"
    ],

    recommended: true,
    badge: "Más Popular",
    category: "hogar",
  },
  {
    id: "h1",
    name: "Hogar Básico",
    price: "$12.999",
    priceNote: "por mes",
    features: ["Internet 50 Mbps", "TV Claro 80 canales", "WiFi incluido"],
    benefits: ["Instalación gratuita", "Sin costo de conexión", "Soporte 24/7"],
    recommended: false,
    category: "hogar",
  },
  {
    id: "h3",
    name: "Hogar Pro",
    price: "$29.999",
    priceNote: "por mes",
    features: ["Internet 500 Mbps", "TV Claro 160 canales HD", "WiFi 6 incluido", "Claro Video + Netflix", "Línea fija incluida"],
    benefits: ["Instalación express", "Router premium WiFi 6", "Soporte VIP", "Sin permanencia"],
    recommended: false,
    badge: "Premium",
    category: "hogar",
  },
  {
    id: "h4",
    name: "Hogar Empresarial",
    price: "$45.999",
    priceNote: "por mes",
    features: ["Internet 1 Gbps simétrico", "IP fija dedicada", "TV Premium 200 canales HD", "WiFi 6 mesh", "Claro Video + Pack completo"],
    benefits: ["SLA garantizado", "Técnico dedicado", "Instalación en 24hs", "Factura electrónica"],
    recommended: false,
    badge: "Empresas",
    category: "hogar",
  },
];

export const initialPlansMovil: Plan[] = [
  {
    id: "m2",
    name: "Móvil Plus",

    price: "$14.999",
    regularPrice: "$24.999",

    promoText: "20 GB",
    shortDescription: "Plan 5G con WhatsApp incluido",

    priceNote: "por mes",

    features: [
      "20 GB de datos 4G/5G",
      "Llamadas ilimitadas",
      "SMS ilimitados",
      "WhatsApp sin consumir datos",
      "Roaming LATAM"
    ],

    benefits: [
      "Portabilidad gratuita",
      "Chip 5G incluido",
      "App Mi Claro",
      "Datos acumulables"
    ],

    recommended: true,
    badge: "Más Popular",
    category: "movil",
  },
  {
    id: "m1",
    name: "Móvil Básico",
    price: "$8.999",
    priceNote: "por mes",
    features: ["5 GB de datos 4G", "200 min llamadas", "SMS ilimitados", "Red 4G LTE"],
    benefits: ["Portabilidad gratuita", "Sin costo de alta", "App Mi Claro"],
    recommended: false,
    category: "movil",
  },
  {
    id: "m3",
    name: "Móvil Pro",
    price: "$21.999",
    priceNote: "por mes",
    features: ["50 GB de datos 5G", "Llamadas ilimitadas", "SMS ilimitados", "Redes sociales libres", "Roaming Internacional", "Hotspot 10 GB"],
    benefits: ["Portabilidad express", "Chip 5G premium", "Soporte prioritario", "Datos acumulables"],
    recommended: false,
    badge: "5G",
    category: "movil",
  },
  {
    id: "m4",
    name: "Flota Empresarial",
    price: "Consultar",
    priceNote: "precio por línea",
    features: ["Datos ilimitados 5G", "Llamadas ilimitadas", "SMS ilimitados", "MDM incluido", "Dashboard de gestión", "API de facturación"],
    benefits: ["Contrato corporativo", "Account manager", "SLA garantizado", "Factura centralizada"],
    recommended: false,
    badge: "Corporativo",
    category: "movil",
  },
];

export const initialSlides: Slide[] = [
  {
    id: "s1",
    icon: "Zap",
    title: "Activación Rápida",
    description: "Tu servicio activo en menos de 24 horas. Proceso simple y sin trámites complicados.",
  },
  {
    id: "s2",
    icon: "Gift",
    title: "Oferta Limitada",
    description: "Precios especiales por tiempo limitado. Aprovechá las promociones exclusivas de la comercializadora.",
  },
  {
    id: "s3",
    icon: "Headphones",
    title: "Atención Personalizada",
    description: "Un asesor dedicado para acompañarte en cada etapa, desde la contratación hasta el postventa.",
  },
  {
    id: "s4",
    icon: "UserCheck",
    title: "Asesor Comercial",
    description: "Contás con un asesor comercial exclusivo que conoce tu negocio y te ofrece la mejor solución.",
  },
  {
    id: "s5",
    icon: "Shield",
    title: "Soporte Especializado",
    description: "Soporte técnico especializado disponible para resolver cualquier inconveniente rápidamente.",
  },
  {
    id: "s6",
    icon: "Tag",
    title: "Promociones Exclusivas",
    description: "Accedé a promociones que no encontrarás en otro lado, diseñadas especialmente para empresas.",
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
