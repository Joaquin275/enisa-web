import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  companyName: z.string().min(2).max(100).optional(),
  companyPhone: z.string().optional(),
  companyEmail: z.string().email().optional(),
  companyAddress: z.string().optional(),
  slotDurationMinutes: z.number().min(30).max(480).optional(),
});

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

  const { slotDurationMinutes, ...siteData } = parsed.data;

  const [settings] = await Promise.all([
    Object.keys(siteData).length > 0
      ? prisma.siteSettings.upsert({
          where: { id: (await prisma.siteSettings.findFirst())?.id ?? "create" },
          update: siteData,
          create: { ...siteData, companyName: siteData.companyName ?? "LimpiezaHogar", companyPhone: siteData.companyPhone ?? "", companyEmail: siteData.companyEmail ?? "", companyAddress: siteData.companyAddress ?? "" },
        })
      : Promise.resolve(null),
    slotDurationMinutes !== undefined
      ? prisma.slotConfig.upsert({
          where: { id: (await prisma.slotConfig.findFirst())?.id ?? "create" },
          update: { slotDurationMinutes },
          create: { slotDurationMinutes },
        })
      : Promise.resolve(null),
  ]);

  return NextResponse.json({ ok: true });
}
