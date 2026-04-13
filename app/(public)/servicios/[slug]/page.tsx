import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MOCK_SERVICES } from "@/lib/mock-data";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

type ServiceData = (typeof MOCK_SERVICES)[0];

async function getService(slug: string): Promise<ServiceData | null> {
  try {
    const service = await prisma.service.findUnique({
      where: { slug, active: true },
    });
    return service as unknown as ServiceData | null;
  } catch {
    return MOCK_SERVICES.find((s) => s.slug === slug) ?? null;
  }
}

export async function generateStaticParams() {
  return MOCK_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle ?? `${service.name} en A Coruña`,
    description: service.metaDescription ?? service.shortDescription,
    alternates: { canonical: `/servicios/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enisalimpieza.es";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} en A Coruña`,
    description: service.shortDescription,
    url: `${siteUrl}/servicios/${service.slug ?? ""}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Enisa Limpieza · Servicios para el Hogar",
      telephone: "+34691746730",
      email: "info@enisalimpieza.es",
      address: {
        "@type": "PostalAddress",
        streetAddress: "C. Vicente Aleixandre, 28",
        postalCode: "15009",
        addressLocality: "A Coruña",
        addressRegion: "Galicia",
        addressCountry: "ES",
      },
    },
    areaServed: [
      { "@type": "City", name: "A Coruña" },
      { "@type": "City", name: "Arteixo" },
      { "@type": "City", name: "Oleiros" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen">
        <div className="bg-navy-950 pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/#servicios"
              className="text-xs text-white/40 hover:text-white/70 tracking-wide transition-colors"
            >
              ← Todos los servicios
            </Link>
            <h1 className="text-4xl md:text-5xl font-light text-white mt-6 leading-tight">
              {service.name}
              <br />
              <span className="font-bold">en A Coruña</span>
            </h1>
            <p className="text-white/60 mt-6 text-lg max-w-2xl leading-relaxed">
              {service.shortDescription}
            </p>
            <div className="mt-10">
              <Link
                href="/reservar"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-navy-900 font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-0.5"
              >
                Solicitar presupuesto
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="prose prose-gray max-w-none">
                {service.description.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-6 text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white border border-gray-200 p-8">
                  <h3 className="font-semibold text-navy-950 mb-6">Solicita presupuesto</h3>
                  <div className="flex flex-col gap-4 text-sm text-gray-600 mb-8">
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-gray-400">Empresa</span>
                      <span className="font-medium">Familiar · +7 años</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-gray-400">Zona</span>
                      <span className="font-medium">A Coruña y alrededores</span>
                    </div>
                    {service.baseDurationMinutes && (
                      <div className="flex justify-between border-b border-gray-100 pb-3">
                        <span className="text-gray-400">Duración estimada</span>
                        <span className="font-medium">
                          {Math.round(service.baseDurationMinutes / 60)}h
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Precio</span>
                      <span className="font-medium">Presupuesto gratuito</span>
                    </div>
                  </div>
                  <Link href="/reservar" className="btn-primary w-full text-center block">
                    Reservar ahora
                  </Link>
                  <p className="text-xs text-gray-400 text-center mt-4">
                    Sin pago online · Sin compromiso
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
