import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  status: z.enum(["PENDIENTE", "CONFIRMADA", "CANCELADA", "COMPLETADA"]).optional(),
  staffId: z.string().cuid().optional(),
  adminNotes: z.string().max(2000).optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ booking });
  } catch {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { service: true, area: true, staff: true },
  });
  if (!booking) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  return NextResponse.json({ booking });
}
