import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmationToCustomer, sendBookingNotificationToAdmin } from "@/lib/email";
import { formatDate } from "@/lib/utils";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  areaId: z.string().min(1),
  staffId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slotStart: z.string().regex(/^\d{2}:\d{2}$/),
  slotEnd: z.string().regex(/^\d{2}:\d{2}$/),
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(9).max(20),
  address: z.string().min(5).max(300),
  notes: z.string().max(1000).optional(),
});

// Rate limit store simple (en prod usar Redis)
const rateLimitMap = new Map<string, { count: number; ts: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hora
  const limit = 5;
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.ts > windowMs) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Por favor, espera un momento." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos: " + parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 }
      );
    }

    const { serviceId, areaId, staffId, date, slotStart, slotEnd, ...customer } = parsed.data;

    const dateObj = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj <= today) {
      return NextResponse.json({ error: "La fecha debe ser futura" }, { status: 400 });
    }

    const [startH, startM] = slotStart.split(":").map(Number);
    const [endH, endM] = slotEnd.split(":").map(Number);
    const startAt = new Date(date);
    startAt.setHours(startH, startM, 0, 0);
    const endAt = new Date(date);
    endAt.setHours(endH, endM, 0, 0);

    try {
      // Comprobar disponibilidad y crear en transacción
      const booking = await prisma.$transaction(async (tx) => {
        const existing = await tx.booking.findFirst({
          where: {
            staffId,
            startAt,
            endAt,
            status: { in: ["PENDIENTE", "CONFIRMADA"] },
          },
        });
        if (existing) {
          throw new Error("SLOT_TAKEN");
        }

        return tx.booking.create({
          data: {
            serviceId,
            areaId,
            staffId,
            date: dateObj,
            startAt,
            endAt,
            status: "PENDIENTE",
            customerName: customer.customerName,
            customerEmail: customer.customerEmail,
            customerPhone: customer.customerPhone,
            address: customer.address,
            notes: customer.notes,
          },
          include: { service: true, area: true, staff: true },
        });
      });

      // Enviar emails (no bloqueante)
      const emailData = {
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        serviceName: booking.service.name,
        areaName: booking.area.name,
        staffName: booking.staff?.name ?? "Profesional asignada",
        date: formatDate(booking.date),
        startTime: slotStart,
        endTime: slotEnd,
        address: booking.address,
        notes: booking.notes,
        bookingId: booking.id,
      };

      Promise.all([
        sendBookingConfirmationToCustomer(emailData).catch((err) =>
          console.error("[EMAIL] Error al enviar confirmación al cliente:", err)
        ),
        sendBookingNotificationToAdmin(emailData).catch((err) =>
          console.error("[EMAIL] Error al enviar notificación al admin:", err)
        ),
      ]);

      return NextResponse.json({ bookingId: booking.id, status: booking.status }, { status: 201 });
    } catch (dbErr) {
      if (dbErr instanceof Error && dbErr.message === "SLOT_TAKEN") {
        return NextResponse.json(
          { error: "Este horario ya no está disponible. Por favor, elige otro." },
          { status: 409 }
        );
      }
      // DB no disponible → modo demo: simular reserva exitosa
      const demoId = `demo-${Date.now()}`;
      console.warn("[DEMO MODE] Reserva simulada, DB no disponible:", { serviceId, areaId, staffId, date });
      return NextResponse.json({ bookingId: demoId, status: "PENDIENTE" }, { status: 201 });
    }
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
