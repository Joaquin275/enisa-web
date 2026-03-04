export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const DEMO_DATA = {
  todayBookings: 0,
  weekBookings: 0,
  pendingCount: 0,
  recentBookings: [] as never[],
};

async function getDashboardData() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);

    const [todayBookings, weekBookings, pendingCount, recentBookings] = await Promise.all([
      prisma.booking.count({ where: { date: { gte: today, lt: new Date(today.getTime() + 86400000) } } }),
      prisma.booking.count({ where: { date: { gte: today, lte: weekEnd } } }),
      prisma.booking.count({ where: { status: "PENDIENTE" } }),
      prisma.booking.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: { service: { select: { name: true } }, staff: { select: { name: true } } },
      }),
    ]);
    return { todayBookings, weekBookings, pendingCount, recentBookings };
  } catch {
    return DEMO_DATA;
  }
}

const statusColors: Record<string, string> = {
  PENDIENTE: "bg-amber-100 text-amber-700",
  CONFIRMADA: "bg-emerald-100 text-emerald-700",
  CANCELADA: "bg-red-100 text-red-700",
  COMPLETADA: "bg-gray-100 text-gray-600",
};

export default async function DashboardPage() {
  const { todayBookings, weekBookings, pendingCount, recentBookings } = await getDashboardData();
  const isDemo = !process.env.DATABASE_URL?.includes("@") || process.env.DATABASE_URL?.includes("USER:PASSWORD");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy-950">Dashboard</h1>
        {isDemo && (
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 font-medium">
            Modo demo · Sin base de datos
          </span>
        )}
      </div>

      {isDemo && (
        <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-8 text-sm text-amber-800">
          <strong>Panel en modo demostración.</strong> Los datos son de ejemplo. Para ver reservas reales, configura{" "}
          <code className="bg-amber-100 px-1 rounded">DATABASE_URL</code> en tu <code className="bg-amber-100 px-1 rounded">.env.local</code> y ejecuta{" "}
          <code className="bg-amber-100 px-1 rounded">npm run db:push && npm run db:seed</code>.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Reservas hoy", value: todayBookings, color: "bg-navy-950 text-white" },
          { label: "Reservas esta semana", value: weekBookings, color: "bg-white text-navy-950 border border-gray-200" },
          { label: "Pendientes de confirmar", value: pendingCount, color: pendingCount > 0 ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-white text-navy-950 border border-gray-200" },
        ].map((stat) => (
          <div key={stat.label} className={`p-6 ${stat.color}`}>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm mt-1 opacity-70">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-navy-950">Reservas recientes</h2>
          <Link href="/admin/reservas" className="text-xs text-navy-600 hover:underline">Ver todas →</Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentBookings.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">
              {isDemo ? "Las reservas aparecerán aquí una vez conectes la base de datos" : "Sin reservas todavía"}
            </div>
          )}
          {recentBookings.map((b: {
            id: string; customerName: string;
            service: { name: string }; staff: { name: string } | null;
            date: Date; status: string;
          }) => (
            <Link key={b.id} href={`/admin/reservas/${b.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <div className="font-medium text-sm text-navy-950">{b.customerName}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {b.service.name} · {b.staff?.name ?? "Sin asignar"} · {formatDate(b.date)}
                </div>
              </div>
              <span className={`text-xs font-medium px-3 py-1 ${statusColors[b.status] ?? "bg-gray-100"}`}>
                {b.status}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: "/admin/reservas", label: "Ver reservas" },
          { href: "/admin/personal", label: "Gestionar personal" },
          { href: "/admin/disponibilidad", label: "Disponibilidad" },
          { href: "/admin/servicios", label: "Servicios" },
        ].map((link) => (
          <Link key={link.href} href={link.href}
            className="bg-white border border-gray-200 px-4 py-4 text-sm font-medium text-navy-900 hover:bg-navy-950 hover:text-white hover:border-navy-950 transition-all text-center"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
