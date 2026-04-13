import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Enisa Limpieza A Coruña | Servicios del Hogar · Empresa Familiar +7 Años",
    template: "%s | Enisa Limpieza A Coruña",
  },
  description:
    "Empresa familiar de limpieza y servicios del hogar en A Coruña y alrededores. Más de 7 años de experiencia en limpieza de hogares, oficinas, final de obra, mantenimiento, cuidado de niños y más.",
  keywords: [
    "limpieza A Coruña",
    "empresa limpieza A Coruña",
    "limpieza hogar A Coruña",
    "servicio limpieza domicilio A Coruña",
    "limpieza oficinas A Coruña",
    "limpieza final de obra A Coruña",
    "mantenimiento hogar A Coruña",
    "manitas A Coruña",
    "pintura domicilio A Coruña",
    "cuidado niños a domicilio A Coruña",
    "lavar planchar domicilio A Coruña",
    "servicio cocina a domicilio A Coruña",
    "empresa familiar limpieza Galicia",
    "limpieza profesional A Coruña",
    "limpieza Arteixo",
    "limpieza Oleiros",
    "limpieza Culleredo",
    "limpieza Cambre",
    "limpieza Sada",
    "Enisa limpieza",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Enisa Limpieza · Servicios para el Hogar",
    title: "Enisa Limpieza A Coruña | Servicios del Hogar · Empresa Familiar +7 Años",
    description:
      "Empresa familiar en A Coruña. Limpieza del hogar, mantenimiento, cuidado de niños, cocina y más. Presupuesto sin compromiso.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "1VdAXE8cE3qtLgq9IHbO-HgFD_dxU_MgyjC3HDt9WJY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
