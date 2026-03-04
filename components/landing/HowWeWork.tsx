"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Solicitas el servicio",
    description:
      "Eliges el servicio, la fecha y la franja horaria que mejor te venga. Sin llamadas, sin esperas.",
  },
  {
    number: "02",
    title: "Confirmamos y preparamos",
    description:
      "Te contactamos para confirmar todos los detalles. Asignamos a la profesional más adecuada según tu servicio.",
  },
  {
    number: "03",
    title: "Trabajamos con cuidado",
    description:
      "Llegamos en el horario acordado y nos ponemos a trabajar. Tú descansas; nosotros nos encargamos de todo.",
  },
];

export function HowWeWork() {
  return (
    <section id="como-trabajamos" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">El proceso</span>
            <h2 className="section-title mt-4 mb-6">
              Simple, rápido
              <br />
              y sin complicaciones
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-md">
              Hemos diseñado un proceso de reserva pensando en tu comodidad. En pocos minutos
              tienes tu servicio agendado con un profesional de confianza en A Coruña.
            </p>
          </motion.div>

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-8 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center border-2 border-navy-200 group-hover:border-navy-900 group-hover:bg-navy-900 transition-all duration-300">
                    <span className="text-sm font-bold text-navy-300 group-hover:text-white transition-colors">
                      {step.number}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-navy-100 mt-4 mb-4" />
                  )}
                </div>
                <div className={`pb-${i < steps.length - 1 ? "10" : "0"} pt-2.5`}>
                  <h3 className="font-display text-lg font-bold text-navy-950 mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
