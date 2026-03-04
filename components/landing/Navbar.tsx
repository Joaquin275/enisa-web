"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/#servicios", label: "Servicios" }, 
  { href: "/#zonas", label: "Zonas" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className={`relative h-12 w-12 rounded-full overflow-hidden transition-all ${scrolled ? "ring-2 ring-navy-100" : "ring-2 ring-white/20"}`}>
                <Image
                  src="/images/Logo.Enisa.png"
                  alt="Enisa Servicios de Limpiezas"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-display text-2xl font-bold tracking-tight transition-colors ${scrolled ? "text-navy-950" : "text-white"}`}>
                  Enisa Limpieza
                </span>
                <span className={`font-display text-[9px] tracking-[0.3em] uppercase font-semibold transition-colors ${scrolled ? "text-navy-500" : "text-white/60"}`}>
                  Servicios para el Hogar
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-60 ${
                    scrolled ? "text-navy-900" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/reservar"
                className={`font-display px-6 py-2.5 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                  scrolled
                    ? "bg-navy-900 text-white hover:bg-navy-800 hover:shadow-lg"
                    : "bg-white text-navy-900 hover:bg-gray-50 hover:shadow-lg"
                }`}
              >
                Reservar servicio
              </Link>
            </div>

            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-navy-900" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block w-6 h-0.5 mt-1.5 transition-all ${scrolled ? "bg-navy-900" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 mt-1.5 transition-all ${scrolled ? "bg-navy-900" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy-950 lg:hidden pt-20 px-6"
          >
            <nav className="flex flex-col gap-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-3xl font-bold text-white/90 hover:text-white transition-colors tracking-tight"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                className="pt-4"
              >
                <Link
                  href="/reservar"
                  className="btn-primary text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Reservar servicio
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
