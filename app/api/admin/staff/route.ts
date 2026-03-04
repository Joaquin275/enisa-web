import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const staffSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  specialties: z.array(z.string()).optional(),
  active: z.boolean().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const staff = await prisma.staff.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ staff });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const body = await req.json();
  const parsed = staffSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  const staff = await prisma.staff.create({ data: { name: parsed.data.name, bio: parsed.data.bio, specialties: parsed.data.specialties ?? [], active: true } });
  return NextResponse.json({ staff }, { status: 201 });
}
