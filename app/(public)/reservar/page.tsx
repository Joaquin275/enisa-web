export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { MOCK_SERVICES, MOCK_AREAS } from "@/lib/mock-data";
import { BookingWizard } from "@/components/booking/BookingWizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitar Presupuesto | Enisa Limpieza · Servicios para el Hogar en A Coruña",
  description:
    "Solicita presupuesto sin compromiso para limpieza, cuidado de niños, cocina o lavado en A Coruña. Elige servicio, fecha y profesional disponible. Confirmación inmediata.",
};

export default async function ReservarPage() {
  let services: { id: string; name: string; shortDescription: string }[] = [];
  let areas: { id: string; name: string }[] = [];

  try {
    [services, areas] = await Promise.all([
      prisma.service.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
        select: { id: true, name: true, shortDescription: true },
      }),
      prisma.area.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
        select: { id: true, name: true },
      }),
    ]);
  } catch {
    // DB no disponible → usar datos de demostración
    services = MOCK_SERVICES.map((s) => ({
      id: s.id,
      name: s.name,
      shortDescription: s.shortDescription,
    }));
    areas = MOCK_AREAS;
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-navy-950 pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">
            Enisa Limpieza · Solicitud de presupuesto
          </span>
          <h1 className="text-3xl md:text-4xl font-light text-white mt-4">
            ¿Qué servicio{" "}
            <span className="font-bold">necesitas?</span>
          </h1>
          <p className="text-white/50 mt-4 text-sm leading-relaxed">
            Limpieza, cuidado de niños, cocina, lavado y planchado — sin compromiso, sin pago online.
            Cuéntanos qué necesitas y te confirmamos en breve.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <BookingWizard services={services} areas={areas} />
      </div>
    </div>
  );
}
