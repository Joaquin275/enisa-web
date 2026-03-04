export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { formatDate, statusColor, statusLabel } from "@/lib/utils";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ status?: string; date?: string }>;
}

export default async function ReservasPage({ searchParams }: Props) {
  const { status, date } = await searchParams;
  const statuses = ["PENDIENTE", "CONFIRMADA", "CANCELADA", "COMPLETADA"];

  let bookings: {
    id: string; customerName: string; customerPhone: string; status: string;
    date: Date; startAt: Date; endAt: Date;
    service: { name: string }; area: { name: string }; staff: { name: string } | null;
  }[] = [];
  let isDemo = false;

  try {
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (date) where.date = { gte: new Date(date + "T00:00:00"), lt: new Date(date + "T23:59:59") };

    bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        service: { select: { name: true } },
        area: { select: { name: true } },
        staff: { select: { name: true } },
      },
    });
  } catch {
    isDemo = true;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy-950">Reservas</h1>
        {isDemo && (
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 font-medium">
            Modo demo
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <Link href="/admin/reservas"
          className={`px-4 py-2 text-xs font-medium border transition-colors ${!status ? "bg-navy-950 text-white border-navy-950" : "border-gray-200 text-gray-600 hover:border-navy-300"}`}
        >
          Todas
        </Link>
        {statuses.map((s) => (
          <Link key={s} href={`/admin/reservas?status=${s}`}
            className={`px-4 py-2 text-xs font-medium border transition-colors ${status === s ? "bg-navy-950 text-white border-navy-950" : "border-gray-200 text-gray-600 hover:border-navy-300"}`}
          >
            {statusLabel(s)}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-gray-200">
        <div className="divide-y divide-gray-100">
          {bookings.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-gray-400 text-sm mb-2">No hay reservas todavía</p>
              {isDemo && (
                <p className="text-xs text-gray-300">
                  Las reservas realizadas desde la web aparecerán aquí
                </p>
              )}
            </div>
          )}
          {bookings.map((b) => (
            <Link key={b.id} href={`/admin/reservas/${b.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <div className="font-medium text-sm text-navy-950">{b.customerName}</div>
                <div className="text-xs text-gray-400">
                  {b.service.name} · {b.area.name} · {b.staff?.name ?? "Sin asignar"}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(b.date)} · {b.startAt.toTimeString().slice(0, 5)} – {b.endAt.toTimeString().slice(0, 5)}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs font-medium px-3 py-1 ${statusColor(b.status)}`}>
                  {statusLabel(b.status)}
                </span>
                <span className="text-xs text-gray-300">{b.customerPhone}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
