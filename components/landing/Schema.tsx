const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enisalimpieza.es";

export function LocalBusinessSchema() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE}/#business`,
    name: "Enisa Limpieza · Servicios para el Hogar",
    alternateName: ["Enisa Limpieza", "Enisa Servicios del Hogar"],
    description:
      "Empresa familiar en A Coruña con más de 7 años de experiencia. Limpieza del hogar, oficinas, obras, pintura y mantenimiento. También cuidado de niños, lavado, planchado y servicio de cocina a domicilio.",
    url: SITE,
    telephone: "+34691746730",
    email: "info@enisalimpieza.es",
    image: `${SITE}/images/Logo.Enisa.png`,
    logo: `${SITE}/images/Logo.Enisa.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C. Vicente Aleixandre, 28",
      postalCode: "15009",
      addressLocality: "A Coruña",
      addressRegion: "Galicia",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.346389,
      longitude: -8.402730,
    },
    areaServed: [
      { "@type": "City", name: "A Coruña" },
      { "@type": "City", name: "Arteixo" },
      { "@type": "City", name: "Oleiros" },
      { "@type": "City", name: "Culleredo" },
      { "@type": "City", name: "Cambre" },
      { "@type": "City", name: "Sada" },
      { "@type": "City", name: "Betanzos" },
      { "@type": "City", name: "Carballo" },
      { "@type": "City", name: "Bergondo" },
      { "@type": "City", name: "Abegondo" },
      { "@type": "AdministrativeArea", name: "Comarca de A Coruña" },
      { "@type": "AdministrativeArea", name: "Galicia" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de limpieza y hogar en A Coruña",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza del Hogar", url: `${SITE}/servicios/limpieza-hogar-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza de Oficinas y Locales", url: `${SITE}/servicios/limpieza-oficinas-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza Final de Obra", url: `${SITE}/servicios/limpieza-final-obra-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pintura y Mantenimiento del Hogar", url: `${SITE}/servicios/mantenimiento-hogar-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza de Apartamentos Turísticos", url: `${SITE}/servicios/limpieza-apartamentos-turisticos-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza de Zonas Comunes", url: `${SITE}/servicios/limpieza-zonas-comunes-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cuidado de Niños a Domicilio", url: `${SITE}/servicios/cuidado-ninos-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lavar y Planchar a Domicilio", url: `${SITE}/servicios/lavado-planchado-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Servicio de Cocina a Domicilio", url: `${SITE}/servicios/servicio-cocina-a-coruna` } },
      ],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+34691746730",
      contactType: "customer service",
      availableLanguage: ["Spanish", "Galician"],
      contactOption: "TollFree",
    },
    sameAs: [
      `https://wa.me/34691746730`,
    ],
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Transferencia, Efectivo",
    foundingDate: "2017",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 4 },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿En qué zonas de A Coruña ofrecéis servicio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prestamos servicio en A Coruña ciudad y toda la comarca: Arteixo, Oleiros, Culleredo, Cambre, Sada, Betanzos, Carballo, Bergondo y Abegondo. Si tu municipio no aparece, consúltanos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo puedo solicitar un presupuesto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Puedes solicitar presupuesto sin compromiso a través de nuestra web en enisalimpieza.es/reservar, por WhatsApp al +34 691 74 67 30 o por email a info@enisalimpieza.es.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto cuesta el servicio de limpieza en A Coruña?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El precio depende del tipo de servicio, tamaño del espacio y frecuencia. Ofrecemos presupuesto personalizado y sin compromiso. Contáctanos para recibir una valoración gratuita.",
        },
      },
      {
        "@type": "Question",
        name: "¿Ofrecéis servicio de cuidado de niños en A Coruña?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Nuestro servicio de cuidado de niños incluye llevarlos al colegio, recogerlos, darles de comer, ayudarles con los deberes y cuidarlos en casa hasta que los padres regresen.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hacéis pintura de pisos y locales en A Coruña?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Realizamos pintura de pisos completos, habitaciones, locales comerciales y oficinas en A Coruña y comarca. También emplastes, reparación de paredes y acabados.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
