export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { AvailabilityManager } from "@/components/admin/AvailabilityManager";

interface AvailabilityRule {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
}

interface AvailabilityException {
  id: string;
  date: Date | string;
  startTime: string | null;
  endTime: string | null;
  reason: string | null;
}

interface StaffItem {
  id: string;
  name: string;
  availabilityRules: AvailabilityRule[];
  availabilityExceptions: AvailabilityException[];
}

const MOCK_STAFF: StaffItem[] = [
  { id: "demo-1", name: "María García", availabilityRules: [], availabilityExceptions: [] },
  { id: "demo-2", name: "Carmen López", availabilityRules: [], availabilityExceptions: [] },
  { id: "demo-3", name: "Laura Fernández", availabilityRules: [], availabilityExceptions: [] },
  { id: "demo-4", name: "Ana Martínez", availabilityRules: [], availabilityExceptions: [] },
];

export default async function DisponibilidadPage() {
  let staff: StaffItem[] = MOCK_STAFF;
  let isDemo = false;

  try {
    const dbStaff = await prisma.staff.findMany({
      where: { active: true },
      include: {
        availabilityRules: { orderBy: [{ weekday: "asc" }, { startTime: "asc" }] },
        availabilityExceptions: { orderBy: { date: "asc" } },
      },
      orderBy: { name: "asc" },
    });
    if (dbStaff.length > 0) {
      staff = dbStaff.map((s) => ({
        id: s.id,
        name: s.name,
        availabilityRules: s.availabilityRules.map((r) => ({
          id: r.id,
          weekday: r.weekday,
          startTime: r.startTime,
          endTime: r.endTime,
        })),
        availabilityExceptions: s.availabilityExceptions.map((e) => ({
          id: e.id,
          date: e.date,
          startTime: e.startTime,
          endTime: e.endTime,
          reason: e.reason,
        })),
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
        <h1 className="text-2xl font-bold text-navy-950">Disponibilidad</h1>
        {isDemo && (
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 font-medium">
            Datos de ejemplo · Modo demo
          </span>
        )}
      </div>
      {isDemo && (
        <div className="bg-amber-50 border border-amber-200 px-4 py-3 mb-6 text-xs text-amber-800">
          Mostrando personal de ejemplo. Conecta la base de datos para gestionar horarios reales.
        </div>
      )}
      <AvailabilityManager staff={staff} />
    </div>
  );
}
