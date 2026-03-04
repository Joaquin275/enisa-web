import { MetadataRoute } from "next";
import { MOCK_SERVICES } from "@/lib/mock-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enisalimpieza.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/reservar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/quienes-somos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/aviso-legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Páginas de servicios — intenta BD, usa MOCK como fallback
  let serviceUrls: MetadataRoute.Sitemap = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    const dbServices = await prisma.service.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true },
    });
    if (dbServices.length > 0) {
      serviceUrls = dbServices.map((s) => ({
        url: `${BASE_URL}/servicios/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Sin BD → usamos servicios del mock
  }

  // Si no hay servicios de BD, usamos los del mock
  if (serviceUrls.length === 0) {
    serviceUrls = MOCK_SERVICES.map((s) => ({
      url: `${BASE_URL}/servicios/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  }

  return [...staticPages, ...serviceUrls];
}
