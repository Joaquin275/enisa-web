"use client";

import { motion } from "framer-motion";

const zones = [
  "A Coruña ciudad",
  "Arteixo",
  "Oleiros",
  "Culleredo",
  "Cambre",
  "Sada",
  "Betanzos",
  "Carballo",
  "Bergondo",
  "Abegondo",
];

export function Zones() {
  return (
    <section id="zonas" className="py-24 lg:py-32 bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
              <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-white/40">
                Cobertura geográfica
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-[1.0] tracking-tighter">
                A Coruña
                <br />
                <span className="font-light text-white/50">y alrededores</span>
              </h2>
            <div className="w-12 h-px bg-white/30 mt-8 mb-8" />
            <p className="text-white/60 leading-relaxed max-w-md">
              Llevamos más de 7 años prestando servicios de limpieza profesional en A Coruña y
              los municipios del área metropolitana. Si no ves tu zona, consúltanos: probablemente
              lleguemos.
            </p>
            <p className="text-white/40 text-sm mt-4">
              Empresa familiar con profundo conocimiento de la zona y sus necesidades.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-px bg-white/10"
          >
            {zones.map((zone, i) => (
              <motion.div
                key={zone}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-navy-900 px-6 py-5 text-sm font-medium text-white/80 hover:text-white hover:bg-navy-800 transition-colors cursor-default"
              >
                {zone}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
