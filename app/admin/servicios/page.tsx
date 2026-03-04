export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { ServicesManager } from "@/components/admin/ServicesManager";

const MOCK_SERVICES = [
  { id: "s1", name: "Limpieza del Hogar", slug: "limpieza-hogar", shortDescription: "Limpieza completa y profesional de tu vivienda", active: true, baseDurationMinutes: 120 },
  { id: "s2", name: "Oficinas y Locales", slug: "oficinas-locales", shortDescription: "Limpieza regular de espacios de trabajo y comercios", active: true, baseDurationMinutes: 120 },
  { id: "s3", name: "Final de Obra", slug: "final-obra", shortDescription: "Limpieza postconstrucción y reforma exhaustiva", active: true, baseDurationMinutes: 240 },
  { id: "s4", name: "Mantenimiento del Hogar", slug: "mantenimiento-hogar-a-coruna", shortDescription: "Pintura, emplastes, reparaciones y mantenimiento general", active: true, baseDurationMinutes: 120 },
  { id: "s5", name: "Apartamentos Turísticos", slug: "apartamentos-turisticos", shortDescription: "Preparación rápida y completa entre huéspedes", active: true, baseDurationMinutes: 90 },
  { id: "s6", name: "Zonas Comunes", slug: "zonas-comunes", shortDescription: "Mantenimiento de escaleras, portales y espacios compartidos", active: true, baseDurationMinutes: 60 },
  { id: "s7", name: "Cuidado de Niños", slug: "cuidado-ninos", shortDescription: "Acompañamiento al colegio, comidas y actividades", active: true, baseDurationMinutes: 120 },
  { id: "s8", name: "Lavar y Planchar", slug: "lavar-planchar", shortDescription: "Lavado, secado y planchado de ropa con cuidado", active: true, baseDurationMinutes: 90 },
  { id: "s9", name: "Servicio de Cocina", slug: "servicio-cocina", shortDescription: "Preparación de menús y orden de cocina", active: true, baseDurationMinutes: 90 },
];

export default async function ServiciosAdminPage() {
  let services: typeof MOCK_SERVICES = MOCK_SERVICES;
  let isDemo = false;

  try {
    const dbServices = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    if (dbServices.length > 0) {
      services = dbServices.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        shortDescription: (s as unknown as { shortDescription: string }).shortDescription ?? s.name,
        active: s.active,
        baseDurationMinutes: (s as unknown as { baseDurationMinutes: number }).baseDurationMinutes ?? 120,
      }));
    } else {
      isDemo = true;
    }
  } catch {
    isDemo = true;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy-950">Servicios</h1>
        {isDemo && (
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 font-medium">
            Datos de ejemplo · Modo demo
          </span>
        )}
      </div>
      {isDemo && (
        <div className="bg-amber-50 border border-amber-200 px-4 py-3 mb-6 text-xs text-amber-800">
          Mostrando servicios de ejemplo. Conecta la base de datos y ejecuta{" "}
          <code className="bg-amber-100 px-1 rounded">npm run db:seed</code> para gestionar servicios reales.
        </div>
      )}
      <ServicesManager initialServices={services} />
    </div>
  );
}
