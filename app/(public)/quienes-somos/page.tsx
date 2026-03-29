import type { Metadata } from "next";
import Link from "next/link";
import { QuienesSomosContent } from "@/components/landing/QuienesSomosContent";

export const metadata: Metadata = {
  title: "Quiénes Somos | Empresa Familiar de Limpieza en A Coruña",
  description:
    "Conoce a Enisa Limpieza: una empresa familiar con más de 7 años de experiencia en limpieza y servicios del hogar en A Coruña y alrededores. Nuestro equipo, nuestros valores.",
  alternates: { canonical: "/quienes-somos" },
  openGraph: {
    title: "Quiénes Somos | Enisa Limpieza A Coruña",
    description:
      "Empresa familiar en A Coruña con más de 7 años de experiencia. Conoce nuestro equipo, valores y filosofía de trabajo.",
  },
};

export default function QuienesSomosPage() {
  return <QuienesSomosContent />;
}
