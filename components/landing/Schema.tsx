export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#business`,
    name: "Enisa Limpieza · Servicios para el Hogar",
    description:
      "Empresa familiar en A Coruña con más de 7 años de experiencia. Limpieza del hogar, oficinas, obras y mantenimiento. También cuidado de niños, lavado y planchado y servicio de cocina.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: "+34691746730",
    email: "info@enisa.es",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/Logo.Enisa.png`,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/Logo.Enisa.png`,
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
      latitude: 43.3623,
      longitude: -8.4115,
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
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de limpieza y hogar en A Coruña",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza del Hogar", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/limpieza-hogar-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza de Oficinas y Locales", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/limpieza-oficinas-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza Final de Obra", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/limpieza-final-obra-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mantenimiento del Hogar", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/mantenimiento-hogar-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza de Apartamentos Turísticos", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/limpieza-apartamentos-turisticos-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Limpieza de Zonas Comunes", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/limpieza-zonas-comunes-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cuidado de Niños a Domicilio", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/cuidado-ninos-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lavar y Planchar a Domicilio", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/lavado-planchado-a-coruna` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Servicio de Cocina a Domicilio", url: `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/servicio-cocina-a-coruna` } },
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
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Transferencia, Efectivo",
    foundingDate: "2017",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
