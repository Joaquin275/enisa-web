"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Llevamos más de 2 años contratando el servicio de limpieza semanal. Puntuales, discretas y el resultado es siempre impecable. Totalmente recomendables.",
    author: "María R.",
    location: "A Coruña",
  },
  {
    text: "Contratamos la limpieza de final de obra para nuestro local. Un trabajo excelente, rápido y al precio acordado. Sin sorpresas, como debe ser.",
    author: "Carlos M.",
    location: "Arteixo",
  },
  {
    text: "Confío en ellas para mi apartamento turístico desde hace un año. Las rotaciones son perfectas y los huéspedes siempre valoran la limpieza con cinco estrellas.",
    author: "Sofía L.",
    location: "Oleiros",
  },
];

export function Experience() {
  return (
    <section id="experiencia" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <span className="section-label">Quiénes somos</span>
            <h2 className="section-title mt-4 mb-8">
              Empresa
              <br />
              familiar
            </h2>
            <div className="w-12 h-px bg-navy-900 mb-8" />
            <p className="text-gray-600 leading-relaxed mb-6">
              Somos una empresa familiar con más de{" "}
              <strong className="text-navy-900">7 años de experiencia</strong> en A Coruña.
              Conocemos cada rincón de la ciudad y sus alrededores, y conocemos a nuestros clientes
              por su nombre.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nuestro equipo de 4 profesionales especializadas trabaja con los mismos estándares de
              exigencia tanto en un hogar como en una gran oficina o un apartamento turístico.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {[
                { value: "+7", label: "Años" },
                { value: "4", label: "Profesionales" },
                { value: "+200", label: "Clientes" },
                { value: "100%", label: "Satisfacción" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-navy-200 pl-4">
                  <div className="font-display text-2xl font-bold text-navy-900 tracking-tight">{s.value}</div>
                  <div className="text-xs text-gray-400 tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <span className="section-label">Testimonios</span>
            </motion.div>

            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gray-100 p-8 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-700 leading-relaxed italic text-base">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-navy-300" />
                  <div>
                    <span className="font-semibold text-navy-900 text-sm">{t.author}</span>
                    <span className="text-gray-400 text-sm"> · {t.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
