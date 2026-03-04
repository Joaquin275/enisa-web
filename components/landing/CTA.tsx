"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-navy-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-white/40">
            Empieza hoy
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-6 mb-8 leading-[1.0] tracking-tighter">
            Tu espacio,
            <br />
            <span className="text-white/50 font-light">perfectamente limpio</span>
          </h2>
          <p className="text-white/50 text-base mb-12 leading-relaxed max-w-md mx-auto">
            Solicita presupuesto sin compromiso. Elige tu servicio, tu fecha y tu profesional.
            En A Coruña y alrededores.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservar"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-navy-900 font-display font-bold text-sm tracking-wide transition-all duration-300 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1"
            >
              Solicitar presupuesto
            </Link>
            <a
              href="tel:+34XXXXXXXXX"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white font-display font-semibold text-sm tracking-wide transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Llamar ahora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
