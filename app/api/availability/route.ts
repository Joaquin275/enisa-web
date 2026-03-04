import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAvailableSlots } from "@/lib/availability";

const schema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

// Staff de demo para cuando no hay DB
const DEMO_STAFF = [
  { id: "demo-maria", name: "María García", bio: "Especialista en limpieza de hogares y apartamentos turísticos." },
  { id: "demo-carmen", name: "Carmen López", bio: "Experta en limpieza final de obra y locales comerciales." },
  { id: "demo-ana", name: "Ana Rodríguez", bio: "Profesional polivalente con especialización en comunidades de vecinos." },
  { id: "demo-laura", name: "Laura Martínez", bio: "Especialista en limpieza de oficinas y espacios de trabajo." },
];

const DEMO_SLOTS = [
  { start: "09:00", end: "11:00" },
  { start: "11:00", end: "13:00" },
  { start: "16:00", end: "18:00" },
  { start: "18:00", end: "20:00" },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const date = new Date(parsed.data.date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date <= today) {
      return NextResponse.json({ error: "La fecha debe ser futura" }, { status: 400 });
    }

    try {
      const slots = await getAvailableSlots(date);
      return NextResponse.json({ slots });
    } catch {
      // DB no disponible → devolver slots de demo
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) {
        // Domingo: sin disponibilidad
        return NextResponse.json({ slots: [] });
      }

      const slotsForDay = dayOfWeek === 6
        ? DEMO_SLOTS.slice(0, 2) // Sábado: solo mañana
        : DEMO_SLOTS;

      const demoSlots = slotsForDay.map((slot) => ({
        slot,
        availableStaff: DEMO_STAFF,
      }));

      return NextResponse.json({ slots: demoSlots });
    }
  } catch {
    return NextResponse.json({ error: "Error al calcular disponibilidad" }, { status: 500 });
  }
}
