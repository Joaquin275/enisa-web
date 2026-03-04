import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  slug: z.string().min(2).max(100).optional(),
  shortDescription: z.string().max(300).optional(),
  description: z.string().optional(),
  baseDurationMinutes: z.number().optional(),
  basePriceEur: z.number().optional(),
  metaTitle: z.string().max(80).optional(),
  metaDescription: z.string().max(200).optional(),
  active: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  const service = await prisma.service.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ service });
}
