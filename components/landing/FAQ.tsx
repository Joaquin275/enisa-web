"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "¿Tenéis experiencia con limpieza de final de obra en A Coruña?",
    a: "Sí. La limpieza de final de obra es uno de nuestros servicios más demandados en A Coruña y alrededores. Llevamos más de 7 años especializados en este tipo de limpiezas: polvo de obra, pintura, escayola, cristales, electrodomésticos nuevos... Lo dejamos todo a punto para que puedas estrenar tu espacio sin preocupaciones.",
  },
  {
    q: "¿Cuánto cuesta el servicio de limpieza del hogar?",
    a: "El precio depende del tamaño de la vivienda, el tipo de limpieza y la frecuencia. Ofrecemos presupuesto personalizado y sin compromiso. Puedes solicitarlo directamente desde nuestra web eligiendo el servicio y la fecha que mejor te venga.",
  },
  {
    q: "¿Trabajáis los fines de semana?",
    a: "Nuestro equipo trabaja de lunes a sábado. Para servicios puntuales o de limpieza de apartamentos turísticos que requieran atención en fin de semana, consúltanos disponibilidad concreta al hacer tu reserva.",
  },
  {
    q: "¿En qué zonas de A Coruña y alrededores prestáis servicio?",
    a: "Atendemos A Coruña ciudad y los principales municipios del área metropolitana: Arteixo, Oleiros, Culleredo, Cambre, Sada, Betanzos, Carballo y alrededores. Si tienes dudas sobre tu zona concreta, consúltanos sin compromiso.",
  },
  {
    q: "¿Traéis vosotros los productos de limpieza?",
    a: "Sí. Llevamos siempre nuestros propios productos de limpieza profesional, respetuosos con el medio ambiente y seguros. Si tienes preferencias específicas (alérgias, productos ecológicos), indícanoslo al hacer la reserva y lo tendremos en cuenta.",
  },
  {
    q: "¿Puedo solicitar siempre a la misma persona?",
    a: "Sí. Entendemos que la confianza es fundamental en este tipo de servicio. Al hacer la reserva puedes ver la disponibilidad de cada una de nuestras profesionales y elegir con quién prefieres trabajar.",
  },
  {
    q: "¿Cómo funciona el sistema de reserva?",
    a: "Es muy sencillo: elige el servicio, la zona, la fecha y la franja horaria. Verás qué profesionales están disponibles para ese momento y podrás elegir. Recibirás una confirmación por email y nos pondremos en contacto contigo para confirmar todos los detalles.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-6 text-left group"
      >
        <span className="font-display text-base font-semibold text-navy-900 group-hover:text-navy-700 transition-colors pr-8 tracking-tight">
            {q}
          </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-navy-400 text-xl leading-none flex-shrink-0 mt-0.5"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 text-sm leading-relaxed pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Preguntas frecuentes</span>
            <h2 className="section-title mt-4">
              Lo que
              <br />
              más nos preguntan
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
