"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CLEANING = "Limpieza";
const HOME = "Servicios del Hogar";

const services = [
  // ── Limpieza ──────────────────────────────────────────────────────────────
  {
    category: CLEANING,
    slug: "limpieza-hogar-a-coruna",
    name: "Limpieza del Hogar",
    description:
      "Limpieza completa y personalizada de tu vivienda. Cocinas, baños, dormitorios y zonas de estar con productos de calidad.",
    detail: "Puntual · Detallada · Personalizada",
    image: "/images/pexels-liliana-drew-9462094.jpg",
  },
  {
    category: CLEANING,
    slug: "limpieza-oficinas-a-coruna",
    name: "Oficinas y Locales",
    description:
      "Mantenemos tu espacio de trabajo impecable. Nos adaptamos a tus horarios para no interrumpir tu actividad.",
    detail: "Discretos · Profesionales · Flexibles",
    image: "/images/pexels-pixabay-209271.jpg",
  },
  {
    category: CLEANING,
    slug: "limpieza-final-obra-a-coruna",
    name: "Final de Obra",
    description:
      "Eliminamos polvo, pintura, escayola y cualquier residuo. Tu espacio listo para estrenar desde el primer día.",
    detail: "Especialistas · Exhaustivos · Eficientes",
    image: "/images/hotel-cleaner.jpg",
  },
  {
    category: CLEANING,
    slug: "mantenimiento-hogar-a-coruna",
    name: "Mantenimiento del Hogar",
    description:
      "Pequeñas reparaciones, pintura, emplastes, colocación de muebles y todo lo que tu hogar necesita. Experiencia y cuidado en cada trabajo.",
    detail: "Pintura · Emplastes · Reparaciones",
    image: "/images/mantenimiento.jpg",
  },
  {
    category: CLEANING,
    slug: "limpieza-apartamentos-turisticos-a-coruna",
    name: "Apartamentos Turísticos",
    description:
      "Rotaciones rápidas y perfectas para tu alojamiento vacacional. Reposición de amenities y ropa de cama.",
    detail: "Rápidos · Flexibles · Fiables",
    image: "/images/pexels-liliana-drew-9462733.jpg",
  },
  {
    category: CLEANING,
    slug: "limpieza-zonas-comunes-a-coruna",
    name: "Zonas Comunes",
    description:
      "Portales, escaleras, garajes y jardines de comunidades de vecinos en A Coruña. Contratos de mantenimiento.",
    detail: "Regular · Puntual · Confianza",
    image: "/images/front-view-man-cleaning-indoors.jpg",
  },

  // ── Servicios del Hogar ───────────────────────────────────────────────────
  {
    category: HOME,
    slug: "cuidado-ninos-a-coruna",
    name: "Cuidado de Niños",
    description:
      "Llevamos y recogemos a los niños del colegio, les damos de comer, les ayudamos con los deberes y los cuidamos con cariño hasta que vuelves a casa.",
    detail: "Cole · Comida · Deberes · Cariño",
    image: "/images/cuidado-ninos.jpg",
  },
  {
    category: HOME,
    slug: "lavado-planchado-a-coruna",
    name: "Lavar y Planchar",
    description:
      "Nos encargamos de toda la colada: lavado, secado y planchado de ropa, sábanas y ropa de cama. Tu ropa siempre lista y en perfecto estado.",
    detail: "Lavado · Secado · Planchado",
    image: "/images/lavar-planchar.jpg",
  },
  {
    category: HOME,
    slug: "servicio-cocina-a-coruna",
    name: "Servicio de Cocina",
    description:
      "Preparamos menús diarios o semanales en tu propia cocina. Comida casera, nutritiva y adaptada a vuestros gustos y necesidades alimentarias.",
    detail: "Menús diarios · Casero · A medida",
    image: "/images/cocina.jpg",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cleaningServices = services.filter((s) => s.category === CLEANING);
const homeServices = services.filter((s) => s.category === HOME);

export function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">Nuestros servicios</span>
          <h2 className="section-title mt-4 max-w-2xl">
            Todo lo que tu hogar
            <br />
            necesita, en un solo lugar
          </h2>
        </motion.div>

        {/* ── CATEGORÍA: Limpieza ── */}
        <CategoryBlock
          label="Limpieza profesional"
          description="Hogar, oficinas, mantenimiento, obras y comunidades"
          services={cleaningServices}
        />

        {/* ── CATEGORÍA: Servicios del Hogar ── */}
        <div className="mt-16">
          <CategoryBlock
            label="Servicios para el hogar"
            description="Cuidado de niños, lavado, planchado y cocina"
            services={homeServices}
            accentColor="navy"
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link href="/reservar" className="btn-primary">
            Solicitar presupuesto sin compromiso
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Bloque por categoría ─────────────────────────────────────────────────────
type ServiceItem = typeof services[number];

function CategoryBlock({
  label,
  description,
  services: items,
  accentColor = "gray",
}: {
  label: string;
  description: string;
  services: ServiceItem[];
  accentColor?: "gray" | "navy";
}) {
  const isNavy = accentColor === "navy";

  return (
    <div>
      {/* Etiqueta de categoría */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-4 mb-6 pb-4 border-b ${isNavy ? "border-navy-200" : "border-gray-200"}`}
      >
        <div className={`w-1 h-8 ${isNavy ? "bg-navy-950" : "bg-gray-400"}`} />
        <div>
          <p className={`font-display font-bold text-base tracking-tight ${isNavy ? "text-navy-950" : "text-gray-700"}`}>
            {label}
          </p>
          <p className="text-xs text-gray-400 font-sans mt-0.5">{description}</p>
        </div>
      </motion.div>

      {/* Grid de tarjetas */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200"
      >
        {items.map((service) => (
          <motion.div key={service.slug} variants={itemVariants}>
            <Link
              href={`/servicios/${service.slug}`}
              className="group flex flex-col h-full bg-white transition-all duration-300 hover:bg-navy-950 block overflow-hidden"
            >
              {/* Imagen o placeholder */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 shrink-0">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <ServiceImagePlaceholder label={service.name} isHome={service.category === HOME} />
                )}
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/20 transition-colors duration-300" />
                {/* Badge de categoría */}
                <div className={`absolute top-3 left-3 text-[9px] font-display font-semibold tracking-[0.18em] uppercase px-2 py-1 ${
                  service.category === HOME
                    ? "bg-navy-950 text-white"
                    : "bg-white/90 text-navy-900"
                }`}>
                  {service.category === HOME ? "Hogar" : "Limpieza"}
                </div>
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1 p-8">
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-navy-950 mb-3 group-hover:text-white transition-colors tracking-tight">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100 group-hover:border-white/10 flex items-center justify-between transition-colors">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 group-hover:text-white/40 transition-colors">
                    {service.detail}
                  </span>
                  <span className="text-navy-600 group-hover:text-white text-sm font-medium transition-colors">
                    Ver más →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Placeholder elegante ─────────────────────────────────────────────────────
function ServiceImagePlaceholder({ label, isHome }: { label: string; isHome?: boolean }) {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-colors ${
      isHome ? "bg-navy-950/5 group-hover:bg-navy-900/20" : "bg-navy-50 group-hover:bg-navy-900/30"
    }`}>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(to right,#1e3a5f 1px,transparent 1px),linear-gradient(to bottom,#1e3a5f 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-navy-300/40 group-hover:border-white/20 transition-colors" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-navy-300/40 group-hover:border-white/20 transition-colors" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-navy-300/40 group-hover:border-white/20 transition-colors" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-navy-300/40 group-hover:border-white/20 transition-colors" />
      <svg className="relative w-8 h-8 text-navy-300/40 group-hover:text-white/20 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {isHome ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        )}
      </svg>
      <span className="relative font-display text-[10px] tracking-[0.22em] uppercase text-navy-400/60 group-hover:text-white/25 transition-colors text-center px-4">
        {label}
      </span>
    </div>
  );
}
