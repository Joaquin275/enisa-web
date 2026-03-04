import type { Metadata } from "next";
import Link from "next/link";
import { QuienesSomosContent } from "@/components/landing/QuienesSomosContent";

export const metadata: Metadata = {
  title: "Quiénes Somos | Empresa Familiar de Limpieza en A Coruña",
  description:
    "Conoce a LimpiezaHogar A Coruña: una empresa familiar con más de 7 años de experiencia en servicios de limpieza profesional en A Coruña y alrededores. Nuestro equipo, nuestros valores.",
  alternates: { canonical: "/quienes-somos" },
  openGraph: {
    title: "Quiénes Somos | LimpiezaHogar A Coruña",
    description:
      "Empresa familiar de limpieza en A Coruña con más de 7 años de experiencia. Conoce nuestro equipo, valores y filosofía de trabajo.",
  },
};

export default function QuienesSomosPage() {
  return <QuienesSomosContent />;
}
