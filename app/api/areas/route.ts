import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const areas = await prisma.area.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, postalCodes: true },
    });
    return NextResponse.json({ areas });
  } catch {
    return NextResponse.json({ error: "Error al cargar zonas" }, { status: 500 });
  }
}
