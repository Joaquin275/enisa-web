import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@enisa.es" },
    update: {},
    create: {
      email: "admin@enisa.es",
      passwordHash: hash,
      name: "Administrador Enisa",
      role: "SUPERADMIN",
    },
  });

  // Services
  const services = [
    {
      slug: "limpieza-hogar-a-coruna",
      name: "Limpieza del Hogar",
      shortDescription: "Limpieza completa y profesional de tu vivienda en A Coruña.",
      description: `Ofrecemos un servicio de limpieza del hogar completo y personalizado en A Coruña y alrededores. Con más de 7 años de experiencia como empresa familiar, garantizamos un resultado impecable adaptado a las necesidades de cada cliente.\n\nNuestro equipo de profesionales se encarga de todas las estancias: cocina, baños, dormitorios, salones y zonas comunes. Utilizamos productos de limpieza de alta calidad, respetuosos con el medio ambiente y seguros para niños y mascotas.\n\nEl servicio incluye aspirado y fregado de suelos, limpieza de superficies, baños y cocina, cambio de ropa de cama y mucho más. Adaptamos la frecuencia a tus necesidades: limpieza puntual, semanal, quincenal o mensual.`,
      baseDurationMinutes: 120,
      metaTitle: "Limpieza del Hogar en A Coruña | Empresa Familiar +7 Años",
      metaDescription: "Servicio profesional de limpieza del hogar en A Coruña y alrededores. Empresa familiar con más de 7 años de experiencia. Pide presupuesto sin compromiso.",
      sortOrder: 1,
    },
    {
      slug: "limpieza-oficinas-a-coruna",
      name: "Limpieza de Oficinas y Locales",
      shortDescription: "Mantenemos tu espacio de trabajo impecable para mayor productividad.",
      description: `La limpieza profesional de oficinas y locales comerciales es esencial para transmitir una imagen de calidad y garantizar el bienestar de empleados y clientes. En A Coruña ofrecemos este servicio con la máxima discreción y eficiencia.\n\nNos adaptamos a los horarios de tu empresa para causar el menor impacto posible en tu actividad. Limpieza de suelos, superficies, baños, zonas de descanso, cristales interiores y mucho más.\n\nTambién atendemos naves industriales y grandes superficies con equipamiento especializado. Pide tu presupuesto personalizado sin compromiso.`,
      baseDurationMinutes: 180,
      metaTitle: "Limpieza de Oficinas en A Coruña | Servicio Profesional",
      metaDescription: "Limpieza profesional de oficinas, locales y naves en A Coruña. Adaptamos nuestros horarios a los tuyos. Empresa familiar con +7 años de experiencia.",
      sortOrder: 2,
    },
    {
      slug: "limpieza-final-obra-a-coruna",
      name: "Limpieza Final de Obra",
      shortDescription: "Tu espacio listo para estrenar tras cualquier reforma o construcción.",
      description: `La limpieza de final de obra requiere profesionales especializados capaces de eliminar restos de pintura, escayola, cemento, polvo de obra y todo tipo de residuos derivados de una reforma o construcción.\n\nEn A Coruña y alrededores, nuestro equipo con más de 7 años de experiencia sabe exactamente cómo dejar tu vivienda, local u oficina en perfectas condiciones para su uso inmediato.\n\nIncluye limpieza de cristales, electrodomésticos, azulejos, suelos y cualquier superficie que requiera atención especial tras la obra. Trabajamos con la máxima eficiencia para que puedas disfrutar de tu nuevo espacio cuanto antes.`,
      baseDurationMinutes: 240,
      metaTitle: "Limpieza Final de Obra en A Coruña | Especialistas",
      metaDescription: "Limpieza de final de obra en A Coruña y alrededores. Eliminamos polvo, pintura y residuos de reforma. Empresa familiar con +7 años de experiencia. Presupuesto gratis.",
      sortOrder: 3,
    },
    {
      slug: "mantenimiento-hogar-a-coruna",
      name: "Pintura y Mantenimiento",
      shortDescription: "Pintamos pisos completos, locales y oficinas. Emplastes, reparaciones y acabados profesionales en A Coruña.",
      description: `En Enisa ofrecemos un servicio integral de pintura y mantenimiento para pisos completos, habitaciones, locales comerciales y oficinas en A Coruña y alrededores. Contamos con más de 7 años de experiencia y un equipo de profesionales que trabaja con cuidado, limpieza y precisión.\n\nPintamos estancias completas, plantas enteras, locales recién reformados y oficinas en activo. También realizamos emplastes y reparación de paredes, gotelé, techos, zócalos y rodapiés, con acabados de alta calidad que marcan la diferencia.\n\nAdemás, atendemos pequeñas reparaciones de carpintería, colocación de muebles y estanterías, y cualquier trabajo de mantenimiento que necesite tu hogar, local o negocio. Pedimos presupuesto sin compromiso y nos adaptamos a tus plazos.`,
      baseDurationMinutes: 240,
      metaTitle: "Pintura de Pisos, Locales y Oficinas en A Coruña | Enisa",
      metaDescription: "Servicio profesional de pintura y mantenimiento en A Coruña. Pintamos pisos completos, locales, oficinas y más. Emplastes y reparaciones. Empresa familiar +7 años. Presupuesto gratis.",
      sortOrder: 4,
    },
    {
      slug: "limpieza-apartamentos-turisticos-a-coruna",
      name: "Apartamentos Turísticos",
      shortDescription: "Rotación rápida y perfecta para tus alojamientos de alquiler vacacional.",
      description: `Si tienes un apartamento turístico o alojamiento vacacional en A Coruña, sabes que la limpieza entre huéspedes es crucial para mantener buenas valoraciones y la reputación de tu propiedad.\n\nNuestro servicio de limpieza para apartamentos turísticos está diseñado para adaptarse a los ritmos del alquiler vacacional: rotaciones rápidas, limpieza exhaustiva, reposición de amenities y cambio de ropa de cama.\n\nTrabajaremos contigo para establecer un protocolo personalizado que garantice la máxima satisfacción de tus huéspedes. Disponibilidad flexible, incluso fines de semana y festivos.`,
      baseDurationMinutes: 90,
      metaTitle: "Limpieza Apartamentos Turísticos A Coruña | Alquiler Vacacional",
      metaDescription: "Servicio de limpieza para apartamentos turísticos en A Coruña. Rotaciones rápidas y perfectas. Empresa familiar +7 años. Presupuesto personalizado sin compromiso.",
      sortOrder: 5,
    },
    {
      slug: "limpieza-zonas-comunes-a-coruna",
      name: "Zonas Comunes",
      shortDescription: "Comunidades de vecinos limpias y cuidadas con servicio regular.",
      description: `El mantenimiento de las zonas comunes de una comunidad de vecinos en A Coruña requiere un servicio regular, puntual y de confianza. Portales, escaleras, ascensores, garajes y jardines son nuestra especialidad.\n\nComo empresa familiar con más de 7 años de experiencia en la zona, entendemos la importancia de la confianza y la discreción en el trabajo en comunidades residenciales.\n\nOfrecemos contratos de mantenimiento con diferentes frecuencias (diario, semanal, quincenal) adaptados al tamaño y necesidades de tu comunidad. Pide tu presupuesto personalizado.`,
      baseDurationMinutes: 60,
      metaTitle: "Limpieza Zonas Comunes en A Coruña | Comunidades de Vecinos",
      metaDescription: "Limpieza de zonas comunes y comunidades de vecinos en A Coruña. Portales, escaleras, garajes. Empresa familiar +7 años. Contrato de mantenimiento personalizado.",
      sortOrder: 6,
    },
    // ── Servicios del Hogar ─────────────────────────────────────────────────
    {
      slug: "cuidado-ninos-a-coruna",
      name: "Cuidado de Niños",
      shortDescription: "Llevamos y recogemos a los niños del colegio y los cuidamos en casa.",
      description: `En Enisa Limpieza entendemos que conciliar la vida laboral y familiar no siempre es fácil. Por eso ofrecemos un servicio de cuidado de niños a domicilio en A Coruña, pensado para ayudarte en el día a día.\n\nNuestras profesionales recogen a los niños en el colegio, les dan la merienda o la comida, les ayudan con los deberes y los cuidan con cariño y responsabilidad hasta que llegues a casa.\n\nTambién nos encargamos de llevarlos al cole por la mañana si lo necesitas. Toda nuestra atención está centrada en el bienestar y la seguridad de los más pequeños, con un trato cercano y de confianza.`,
      baseDurationMinutes: 120,
      metaTitle: "Cuidado de Niños a Domicilio en A Coruña | Enisa Limpieza",
      metaDescription: "Servicio de cuidado de niños en A Coruña. Recogida en el colegio, comida, merienda y ayuda con deberes. Empresa familiar de confianza. Pide presupuesto.",
      sortOrder: 7,
    },
    {
      slug: "lavado-planchado-a-coruna",
      name: "Lavar y Planchar",
      shortDescription: "Tu ropa siempre perfecta: lavado, secado y planchado a domicilio.",
      description: `¿No tienes tiempo para la colada? En Enisa Limpieza nos ocupamos de todo. Nuestro servicio de lavado y planchado a domicilio en A Coruña te libera de una de las tareas más tediosas del hogar.\n\nNos encargamos de toda la colada: clasificamos la ropa, la lavamos a la temperatura adecuada para cada tejido, la secamos y la dejamos perfectamente planchada y ordenada.\n\nTambién gestionamos la ropa de cama, toallas y cualquier otra prenda del hogar. Puedes contratarlo como servicio independiente o combinarlo con la limpieza del hogar para una solución integral.`,
      baseDurationMinutes: 90,
      metaTitle: "Lavar y Planchar a Domicilio en A Coruña | Enisa Limpieza",
      metaDescription: "Servicio de lavar y planchar a domicilio en A Coruña. Ropa, sábanas y ropa de cama siempre perfecta. Empresa familiar. Presupuesto sin compromiso.",
      sortOrder: 8,
    },
    {
      slug: "servicio-cocina-a-coruna",
      name: "Servicio de Cocina",
      shortDescription: "Menús diarios caseros preparados en tu propia cocina.",
      description: `¿Llegas a casa cansado y sin tiempo para cocinar? Nuestro servicio de cocina a domicilio en A Coruña es la solución. Una profesional de Enisa Limpieza acude a tu hogar y prepara comidas caseras, nutritivas y deliciosas en tu propia cocina.\n\nAdaptamos los menús a vuestros gustos, intolerancias y necesidades alimentarias. Podemos preparar el menú del día, cocinar para toda la semana de una vez o adaptarnos a lo que cada familia necesite.\n\nCocina de temporada, recetas tradicionales o platos especiales. Tu familia come bien cada día sin que tengas que preocuparte por nada.`,
      baseDurationMinutes: 120,
      metaTitle: "Servicio de Cocina a Domicilio en A Coruña | Enisa Limpieza",
      metaDescription: "Servicio de cocina a domicilio en A Coruña. Menús caseros diarios o semanales preparados en tu casa. Adaptado a tus gustos. Empresa familiar. Pide presupuesto.",
      sortOrder: 9,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  // Areas
  const areas = [
    { name: "A Coruña ciudad", postalCodes: ["15001","15002","15003","15004","15005","15006","15007","15008","15009","15010","15011","15012"], sortOrder: 1 },
    { name: "Arteixo", postalCodes: ["15142","15143","15144"], sortOrder: 2 },
    { name: "Oleiros", postalCodes: ["15173","15174","15175","15176"], sortOrder: 3 },
    { name: "Culleredo", postalCodes: ["15189","15190"], sortOrder: 4 },
    { name: "Cambre", postalCodes: ["15660","15669"], sortOrder: 5 },
    { name: "Sada", postalCodes: ["15160"], sortOrder: 6 },
    { name: "Betanzos", postalCodes: ["15300"], sortOrder: 7 },
    { name: "Carballo", postalCodes: ["15100"], sortOrder: 8 },
  ];

  for (const area of areas) {
    await prisma.area.upsert({
      where: { id: area.name },
      update: {},
      create: area,
    });
  }

  // Staff
  const staffMembers = [
    { name: "María García", bio: "Especialista en limpieza de hogares y apartamentos turísticos con 8 años de experiencia.", specialties: ["hogar","apartamentos-turisticos","zonas-comunes"], active: true },
    { name: "Carmen López", bio: "Experta en limpieza final de obra y locales comerciales. Meticulosa y eficiente.", specialties: ["final-obra","oficinas","mantenimiento"], active: true },
    { name: "Ana Rodríguez", bio: "Profesional polivalente con especialización en comunidades de vecinos y mantenimiento del hogar.", specialties: ["zonas-comunes","hogar","mantenimiento"], active: true },
    { name: "Laura Martínez", bio: "Especialista en limpieza de oficinas y espacios de trabajo. Máxima discreción.", specialties: ["oficinas","hogar","apartamentos-turisticos"], active: true },
  ];

  const staff = [];
  for (const member of staffMembers) {
    const s = await prisma.staff.create({ data: member });
    staff.push(s);
  }

  // Availability rules (L-V, 9-13 y 16-20)
  for (const s of staff) {
    for (const weekday of [1, 2, 3, 4, 5]) {
      await prisma.availabilityRule.create({
        data: { staffId: s.id, weekday, startTime: "09:00", endTime: "13:00" },
      });
      await prisma.availabilityRule.create({
        data: { staffId: s.id, weekday, startTime: "16:00", endTime: "20:00" },
      });
    }
    // Sábados solo mañana
    await prisma.availabilityRule.create({
      data: { staffId: s.id, weekday: 6, startTime: "09:00", endTime: "13:00" },
    });
  }

  // Slot config
  await prisma.slotConfig.create({
    data: {
      slotDurationMinutes: 120,
      dailyTimeWindows: [
        { start: "09:00", end: "13:00" },
        { start: "16:00", end: "20:00" },
      ],
    },
  });

  // Site settings
  await prisma.siteSettings.create({
    data: {
      companyName: "Enisa Limpieza · Servicios para el Hogar",
      companyPhone: "+34 691 74 67 30",
      companyEmail: "info@enisalimpieza.es",
      companyAddress: "C. Vicente Aleixandre, 28, 15009 A Coruña, Galicia",
      schemaCity: "A Coruña",
      schemaRegion: "Galicia",
      schemaCountry: "ES",
    },
  });

  console.log("✅ Seed completado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

