"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Carrusel de vídeos — cada uno se muestra ~5s antes de pasar al siguiente.
// Los vídeos se reproducen sin sonido (muted) y en bucle corto.
// ─────────────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    video: "/videos/video-cleaning-1.mp4",
    label: "Limpieza profesional",
    tag: "Limpieza",
  },
  {
    video: "/videos/video-cleaning-2.mp4",
    label: "Hogares impecables",
    tag: "Limpieza",
  },
  {
    video: "/videos/video-hogar.mp4",
    label: "Cuidado de niños",
    tag: "Servicios del Hogar",
  },
  {
    video: "/videos/video-cocina.mp4",
    label: "Servicio de cocina",
    tag: "Servicios del Hogar",
  },
];

const SLIDE_DURATION = 5000; // ms por slide

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = (idx: number) => {
    setPrev(current);
    setCurrent(idx);
  };

  // Auto-avance
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  // Reiniciar vídeo activo desde el principio
  useEffect(() => {
    const vid = videoRefs.current[current];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, [current]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-navy-950">

      {/* ── CAPA DE VÍDEOS — solo renderiza el actual y el siguiente ── */}
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        const isNext = i === (current + 1) % SLIDES.length;
        if (!isActive && !isNext) return null;
        return (
          <div
            key={slide.video}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={slide.video}
              autoPlay={isActive}
              muted
              playsInline
              loop
              preload={isActive ? "auto" : "none"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        );
      })}

      {/* ── OVERLAYS ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-navy-950/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent" />

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div className="relative z-20 flex flex-col justify-end flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-28 pb-8 sm:pb-14 lg:pb-24">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Tag de categoría del slide actual — dentro del flujo, sin absolute */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${current}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3"
            >
              <span className="inline-block font-display text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] uppercase text-white/55 border border-white/20 px-2.5 py-1">
                {SLIDES[current].tag}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Label animado del slide */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`label-${current}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35 }}
              className="font-display text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-white/40 mb-3 sm:mb-4"
            >
              {SLIDES[current].label}
            </motion.p>
          </AnimatePresence>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tighter mb-4 sm:mb-5"
          >
            Tu hogar,
            <br />
            <span className="font-light text-white/45">en buenas manos</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm sm:text-base text-white/55 leading-relaxed mb-5 sm:mb-7 font-sans max-w-sm sm:max-w-md"
          >
            Limpieza profesional, cuidado de niños, cocina, lavado y planchado.
            Empresa familiar en A Coruña con más de 7 años de confianza.
          </motion.p>

          {/* Píldoras de servicios — ocultas en móvil muy pequeño */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden sm:flex flex-wrap gap-2 mb-7"
          >
            {["Limpieza", "Cuidado de niños", "Cocina", "Lavar y planchar"].map((tag) => (
              <span key={tag} className="text-[9px] font-display font-semibold tracking-[0.18em] uppercase text-white/45 border border-white/15 px-2.5 py-1.5">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/reservar"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-navy-900 font-display font-bold text-sm tracking-wide transition-all duration-300 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-0.5"
            >
              Solicitar presupuesto
            </Link>
            <Link
              href="/#servicios"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 border border-white/25 text-white font-display font-medium text-sm tracking-wide transition-all duration-300 hover:border-white/55 hover:bg-white/5"
            >
              Ver servicios
            </Link>
          </motion.div>
        </div>

        {/* ── Stats + controles ── */}
        <div className="mt-8 sm:mt-12 flex flex-row items-end justify-between gap-4 border-t border-white/10 pt-6">

          {/* Stats — números más pequeños en móvil */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { value: "+7", label: "Años" },
              { value: "4", label: "Profesionales" },
              { value: "100%", label: "Satisfacción" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-[9px] sm:text-[10px] text-white/35 mt-0.5 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Controles del carrusel */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {SLIDES.map((slide, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={slide.label}
                className="group flex flex-col items-center gap-1"
              >
                <div className="relative w-7 sm:w-10 h-0.5 bg-white/20 overflow-hidden">
                  {i === current && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                      key={current}
                    />
                  )}
                  {i !== current && (
                    <div className="absolute inset-0 group-hover:bg-white/40 transition-colors" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
