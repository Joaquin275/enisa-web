export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { formatDate, statusColor, statusLabel } from "@/lib/utils";
import { BookingActions } from "@/components/admin/BookingActions";

interface Props {
  params: Promise<{ id: string }>;
}

type BookingWithRelations = Prisma.BookingGetPayload<{
  include: { service: true; area: true; staff: true };
}>;

export default async function BookingDetailPage({ params }: Props) {
  const { id } = await params;

  let booking: BookingWithRelations | null = null;
  let allStaff: { id: string; name: string }[] = [];

  try {
    booking = await prisma.booking.findUnique({
      where: { id },
      include: { service: true, area: true, staff: true },
    });
    allStaff = await prisma.staff.findMany({
      where: { active: true },
      select: { id: true, name: true },
    });
  } catch {
    // Sin BD → notFound
  }

  if (!booking) notFound();

  const rows = [
    { label: "Servicio", value: booking.service.name },
    { label: "Zona", value: booking.area.name },
    { label: "Profesional", value: booking.staff?.name ?? "Sin asignar" },
    { label: "Fecha", value: formatDate(booking.date) },
    { label: "Horario", value: `${booking.startAt.toTimeString().slice(0, 5)} – ${booking.endAt.toTimeString().slice(0, 5)}` },
    { label: "Cliente", value: booking.customerName },
    { label: "Email", value: booking.customerEmail },
    { label: "Teléfono", value: booking.customerPhone },
    { label: "Dirección", value: booking.address },
    ...(booking.notes ? [{ label: "Notas cliente", value: booking.notes }] : []),
    ...(booking.adminNotes ? [{ label: "Notas admin", value: booking.adminNotes }] : []),
    { label: "Creada", value: formatDate(booking.createdAt, "d MMM yyyy, HH:mm") },
    { label: "Referencia", value: booking.id },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <a href="/admin/reservas" className="text-xs text-gray-400 hover:text-navy-900">
            ← Volver a reservas
          </a>
          <h1 className="text-2xl font-bold text-navy-950 mt-2">
            Reserva de {booking.customerName}
          </h1>
        </div>
        <span className={`text-sm font-semibold px-4 py-2 ${statusColor(booking.status)}`}>
          {statusLabel(booking.status)}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-200">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-6 px-6 py-4 border-b border-gray-100 last:border-0">
              <span className="text-xs font-semibold tracking-wide uppercase text-gray-400 w-32 shrink-0 pt-0.5">
                {row.label}
              </span>
              <span className="text-sm text-navy-950 break-all">{row.value}</span>
            </div>
          ))}
        </div>

        <div>
          <BookingActions
            bookingId={booking.id}
            currentStatus={booking.status}
            currentStaffId={booking.staffId ?? ""}
            allStaff={allStaff}
          />
        </div>
      </div>
    </div>
  );
}
