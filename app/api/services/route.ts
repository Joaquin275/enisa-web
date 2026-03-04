import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        shortDescription: true,
        description: true,
        baseDurationMinutes: true,
        basePriceEur: true,
      },
    });
    return NextResponse.json({ services });
  } catch {
    return NextResponse.json({ error: "Error al cargar servicios" }, { status: 500 });
  }
}
