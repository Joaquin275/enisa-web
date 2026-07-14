import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Enisa Limpieza A Coruña | Servicios del Hogar · Empresa Familiar +7 Años",
    template: "%s | Enisa Limpieza A Coruña",
  },
  description:
    "Enisa Limpieza — empresa familiar en A Coruña con más de 7 años. Limpieza del hogar, oficinas, final de obra, pintura, cuidado de niños, cocina y lavandería. Servicio en toda la comarca de A Coruña.",
  keywords: [
    // Marca
    "Enisa Limpieza", "Enisa servicios hogar", "enisalimpieza.es",
    // Limpieza A Coruña
    "limpieza A Coruña", "empresa limpieza A Coruña", "limpieza hogar A Coruña",
    "servicio limpieza domicilio A Coruña", "limpieza profesional A Coruña",
    "limpieza pisos A Coruña", "asistenta hogar A Coruña", "empleada hogar A Coruña",
    // Servicios específicos
    "limpieza oficinas A Coruña", "limpieza final de obra A Coruña",
    "pintura pisos A Coruña", "pintura domicilio A Coruña", "pintura locales A Coruña",
    "manitas A Coruña", "mantenimiento hogar A Coruña",
    "cuidado niños a domicilio A Coruña", "cuidadora niños A Coruña",
    "lavar planchar domicilio A Coruña", "lavandería domicilio A Coruña",
    "servicio cocina a domicilio A Coruña", "cocinera domicilio A Coruña",
    "limpieza apartamentos turísticos A Coruña", "limpieza comunidades vecinos A Coruña",
    // Comarca
    "limpieza Arteixo", "limpieza Oleiros", "limpieza Culleredo", "limpieza Cambre",
    "limpieza Sada", "limpieza Betanzos", "limpieza Carballo", "limpieza Bergondo",
    "empresa limpieza comarca A Coruña", "servicios hogar comarca A Coruña",
    // Galicia
    "empresa familiar limpieza Galicia", "limpeza A Coruña", "servizos fogar A Coruña",
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
      <body className="antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
