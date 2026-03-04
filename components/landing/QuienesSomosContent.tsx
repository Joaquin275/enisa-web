"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ImageSlot, ImageSlotLight } from "@/components/ui/ImageSlot";

const values = [
  {
    title: "Confianza",
    description:
      "Entramos en tu hogar o tu negocio. Por eso la confianza es el pilar de todo lo que hacemos. Equipo estable, discreto y comprometido desde el primer día.",
  },
  {
    title: "Detalle",
    description:
      "La diferencia entre una limpieza correcta y una limpieza excelente está en los detalles. Nosotros vamos siempre a por la excelente.",
  },
  {
    title: "Puntualidad",
    description:
      "Tu tiempo es valioso. Llegamos cuando decimos que llegamos y terminamos cuando decimos que terminamos. Sin excusas.",
  },
  {
    title: "Adaptación",
    description:
      "Cada cliente es diferente. Escuchamos, ajustamos y nos adaptamos a tus necesidades concretas, no a un protocolo genérico.",
  },
];

const team = [
  {
    name: "María García",
    role: "Especialista en hogares y apartamentos turísticos",
    years: "8 años de experiencia",
    description:
      "María es la primera que se incorporó al equipo. Su meticulosidad y cariño por el trabajo bien hecho son su seña de identidad. Especializada en limpieza de hogares y rotaciones de apartamentos turísticos.",
    photo: "/images/pexels-liliana-drew-9462094.jpg",
  },
  {
    name: "Carmen López",
    role: "Experta en final de obra y locales comerciales",
    years: "6 años de experiencia",
    description:
      "Carmen se especializó en limpiezas de final de obra, donde su ojo clínico y su eficiencia son insuperables. También lleva el mantenimiento de varios locales comerciales en A Coruña.",
    photo: "/images/pexels-liliana-drew-9462733.jpg",
  },
  {
    name: "Ana Rodríguez",
    role: "Profesional en zonas comunes y comunidades",
    years: "5 años de experiencia",
    description:
      "Ana es la responsable de varias comunidades de vecinos en la ciudad. Su puntualidad y discreción la han convertido en la persona de confianza de numerosas comunidades en A Coruña.",
    photo: "/images/hotel-cleaner.jpg",
  },
  {
    name: "Laura Martínez",
    role: "Especialista en oficinas y espacios corporativos",
    years: "4 años de experiencia",
    description:
      "Laura aporta al equipo su experiencia en entornos corporativos: sabe perfectamente cómo trabajar con la máxima eficiencia y discreción en oficinas y espacios de trabajo activos.",
    photo: "/images/front-view-man-cleaning-indoors.jpg",
  },
];

const milestones = [
  { year: "2017", text: "Fundación de la empresa. Primeros clientes en A Coruña ciudad." },
  { year: "2019", text: "Ampliación del equipo. Comenzamos a dar servicio a Oleiros y Arteixo." },
  { year: "2021", text: "Incorporación del servicio de apartamentos turísticos y final de obra." },
  { year: "2023", text: "Más de 200 clientes activos. Cobertura en 8 municipios del área metropolitana." },
  { year: "2024", text: "Lanzamiento de la web y sistema de reservas online para mejorar la experiencia del cliente." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function QuienesSomosContent() {
  return (
    <div className="min-h-screen">

      {/* ── Hero con imagen ── */}
      <div className="bg-navy-950 pt-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end pb-0">

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="pb-16 lg:pb-24"
            >
              <Link
                href="/"
                className="font-display text-xs text-white/40 hover:text-white/70 tracking-widest uppercase transition-colors"
              >
                ← Inicio
              </Link>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-8 leading-[1.0] tracking-tighter">
                Una empresa
                <br />
                <span className="font-light text-white/45">familiar</span>
              </h1>
              <p className="text-white/55 mt-8 text-base max-w-md leading-relaxed font-sans">
                Más de 7 años cuidando hogares, oficinas y espacios en A Coruña y alrededores
                con la misma filosofía: hacerlo bien, siempre.
              </p>

              <div className="mt-12 grid grid-cols-3 gap-6 max-w-xs border-t border-white/10 pt-10">
                {[
                  { value: "+7", label: "Años" },
                  { value: "4", label: "Profesionales" },
                  { value: "+200", label: "Clientes" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                    <div className="text-[10px] text-white/35 mt-1 tracking-widest uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Imagen hero — ocupa la parte inferior derecha */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block self-end"
            >
              <ImageSlot
                src="/images/pexels-liliana-drew-9462094.jpg"
                alt="Equipo Enisa trabajando"
                aspectRatio="portrait"
                className="w-full"
                priority
              />
              {/* Badge */}
              <div className="absolute -left-6 top-1/3 bg-white px-5 py-4 shadow-xl">
                <div className="font-display text-xs tracking-[0.2em] uppercase text-navy-400">Empresa</div>
                <div className="font-display text-lg font-bold text-navy-950 mt-0.5">Familiar</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Historia + imagen ── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Imagen historia */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <ImageSlotLight
                src="/images/hotel-cleaner.jpg"
                alt="Equipo Enisa en A Coruña"
                aspectRatio="portrait"
              />
              <ImageSlotLight
                src="/images/close-up-cleaning-window-with-sponge.jpg"
                alt="Detalle de trabajo Enisa"
                aspectRatio="landscape"
              />
            </motion.div>

            {/* Texto historia */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <span className="section-label">Nuestra historia</span>
              <h2 className="section-title mt-4 mb-8">
                Empezamos
                <br />
                desde cero
              </h2>
              <div className="flex flex-col gap-4 text-gray-600 leading-relaxed text-sm mb-12">
                <p>
                  Enisa nació en 2017 como un proyecto familiar pequeño, con un
                  único objetivo: ofrecer en A Coruña el servicio de limpieza que a nosotros mismos
                  nos gustaría recibir.
                </p>
                <p>
                  Empezamos con unos pocos clientes en el centro de la ciudad y fuimos creciendo
                  poco a poco, siempre con el mismo compromiso: no perder la calidad al crecer. Por
                  eso hoy somos cuatro profesionales —no una gran empresa con rotación constante—,
                  y por eso nuestros clientes saben que cuando reservan, saben exactamente quién va
                  a venir.
                </p>
                <p>
                  Hoy atendemos más de 200 clientes activos en A Coruña y los municipios del
                  área metropolitana: Arteixo, Oleiros, Culleredo, Cambre, Sada, Betanzos y
                  Carballo. Y seguimos siendo la misma empresa familiar de siempre.
                </p>
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-0">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 border-2 border-navy-200 group-hover:border-navy-900 group-hover:bg-navy-900 flex items-center justify-center transition-all duration-300 shrink-0">
                        <span className="font-display text-[10px] font-bold text-navy-400 group-hover:text-white transition-colors">
                          {m.year.slice(2)}
                        </span>
                      </div>
                      {i < milestones.length - 1 && (
                        <div className="w-px flex-1 bg-navy-100 my-2" />
                      )}
                    </div>
                    <div className={`${i < milestones.length - 1 ? "pb-6" : ""} pt-1.5`}>
                      <span className="font-display text-xs font-bold text-navy-600 tracking-wide">{m.year}</span>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="section-label">Lo que nos define</span>
            <h2 className="section-title mt-4">
              Nuestros valores
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={itemVariants}
                className="bg-white p-10 hover:bg-navy-950 group transition-colors duration-300"
              >
                <h3 className="font-display text-xl font-bold text-navy-950 mb-4 group-hover:text-white transition-colors tracking-tight">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-white/65 transition-colors">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Equipo con fotos ── */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="section-label">Las personas</span>
            <h2 className="section-title mt-4">
              Nuestro equipo
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mt-6 max-w-lg">
              Cuando contratas nuestros servicios, sabes exactamente quién va a venir. No somos
              una plataforma con cientos de personas. Somos cuatro profesionales de confianza.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="group flex flex-col"
              >
                {/* Foto de perfil */}
                <div className="relative overflow-hidden mb-5">
                  <ImageSlotLight
                    src={member.photo}
                    alt={`${member.name} - Enisa`}
                    aspectRatio="portrait"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 bg-white border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-display font-bold text-navy-950 text-base tracking-tight">{member.name}</h3>
                  <p className="text-navy-600 text-xs font-semibold tracking-wide mt-1">{member.role}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 mb-4 tracking-wide">{member.years}</p>
                  <div className="w-6 h-px bg-navy-200 mb-4" />
                  <p className="text-gray-500 text-xs leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Nota instruccional */}
          <p className="mt-8 text-xs text-gray-400 text-center">
            Para añadir las fotos del equipo, descomenta{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 text-gray-500">photo:</code> en cada miembro
            y coloca las imágenes en{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 text-gray-500">public/images/</code>
          </p>
        </div>
      </section>

      {/* ── Por qué elegirnos ── */}
      <section className="py-24 lg:py-32 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-white/40">
                La diferencia
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 leading-[1.05] tracking-tighter">
                Por qué elegir
                <br />
                <span className="font-light text-white/45">una empresa familiar</span>
              </h2>
              <div className="w-12 h-px bg-white/15 my-8" />
              <p className="text-white/55 text-sm leading-relaxed">
                Las grandes plataformas de limpieza tienen cientos de trabajadores y alta rotación.
                Cada vez que reservas puede venir una persona diferente que no conoce tu casa,
                tus preferencias ni tus rutinas.
              </p>
              <p className="text-white/55 text-sm leading-relaxed mt-4">
                Con nosotros, eso no pasa. Conocemos a nuestros clientes por su nombre, conocemos
                sus casas y sus oficinas, y llevamos años trabajando para ellos. Esa continuidad
                y esa confianza no tiene precio.
              </p>

              {/* Imagen dentro de sección navy */}
              <div className="mt-10">
                <ImageSlot
                  src="/images/pexels-pixabay-209271.jpg"
                  alt="Equipo Enisa en acción"
                  aspectRatio="landscape"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              {[
                "Equipo fijo de 4 profesionales — siempre sabes quién viene",
                "Más de 7 años en A Coruña — conocemos la zona y sus clientes",
                "Sin rotación — continuidad y confianza garantizadas",
                "Adaptación real — no aplicamos protocolos genéricos",
                "Comunicación directa — sin intermediarios ni call centers",
                "Presupuesto sin compromiso — transparencia total",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-white/5 px-5 py-4 hover:bg-white/10 transition-colors"
                >
                  <span className="font-display text-white/25 text-xs font-bold mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/75 text-sm leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-950 mb-4 tracking-tighter">
              ¿Hablamos?{" "}
              <span className="font-light text-navy-400">Pide presupuesto</span>
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Sin compromiso. Sin pago online. Te contactamos en menos de 24 horas para
              confirmar todos los detalles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservar" className="btn-primary">
                Solicitar presupuesto
              </Link>
              <Link href="/#servicios" className="btn-outline">
                Ver servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
