export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { StaffManager } from "@/components/admin/StaffManager";

interface StaffMember {
  id: string;
  name: string;
  bio: string | null;
  active: boolean;
  specialties: string[];
}

const MOCK_STAFF: StaffMember[] = [
  { id: "demo-1", name: "María García", bio: "Especialista en limpieza del hogar y servicios domésticos", active: true, specialties: ["hogar", "limpieza"] },
  { id: "demo-2", name: "Carmen López", bio: "Experta en cuidado de niños y servicios de cocina", active: true, specialties: ["cuidado niños", "cocina"] },
  { id: "demo-3", name: "Laura Fernández", bio: "Especializada en oficinas, locales y final de obra", active: true, specialties: ["oficinas", "final de obra"] },
  { id: "demo-4", name: "Ana Martínez", bio: "Servicio de lavado, planchado y mantenimiento del hogar", active: true, specialties: ["lavar", "planchar", "mantenimiento"] },
];

export default async function PersonalPage() {
  let staff: StaffMember[] = MOCK_STAFF;
  let isDemo = false;

  try {
    const dbStaff = await prisma.staff.findMany({ orderBy: { createdAt: "asc" } });
    if (dbStaff.length > 0) {
      staff = dbStaff.map((s) => ({
        id: s.id,
        name: s.name,
        bio: s.bio ?? null,
        active: s.active,
        specialties: Array.isArray(s.specialties) ? (s.specialties as string[]) : [],
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
        <h1 className="text-2xl font-bold text-navy-950">Personal</h1>
        {isDemo && (
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 font-medium">
            Datos de ejemplo · Modo demo
          </span>
        )}
      </div>
      {isDemo && (
        <div className="bg-amber-50 border border-amber-200 px-4 py-3 mb-6 text-xs text-amber-800">
          Mostrando personal de ejemplo. Conecta la base de datos y ejecuta{" "}
          <code className="bg-amber-100 px-1 rounded">npm run db:seed</code> para gestionar el personal real.
        </div>
      )}
      <StaffManager initialStaff={staff} />
    </div>
  );
}
