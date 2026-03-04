import Link from "next/link";
import Image from "next/image";

const services = [
  { name: "Limpieza del Hogar", href: "/servicios/limpieza-hogar-a-coruna" },
  { name: "Oficinas y Locales", href: "/servicios/limpieza-oficinas-a-coruna" },
  { name: "Final de Obra", href: "/servicios/limpieza-final-obra-a-coruna" },
  { name: "Mantenimiento del Hogar", href: "/servicios/mantenimiento-hogar-a-coruna" },
  { name: "Apartamentos Turísticos", href: "/servicios/limpieza-apartamentos-turisticos-a-coruna" },
  { name: "Zonas Comunes", href: "/servicios/limpieza-zonas-comunes-a-coruna" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-navy-100 shrink-0">
                <Image
                  src="/images/Logo.Enisa.png"
                  alt="Enisa Servicios de Limpiezas"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-navy-950 block leading-tight">Enisa Limpieza</span>
                <span className="text-xs tracking-[0.2em] uppercase text-navy-400 font-medium">
                  Servicios para el Hogar
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Empresa familiar en A Coruña. Servicios de limpieza profesional, cuidado de niños,
              lavado, planchado y cocina. Más de 7 años cuidando hogares.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <a href="tel:+34691746730" className="hover:text-navy-900 transition-colors">
                +34 691 74 67 30
              </a>
              <a href="mailto:info@enisa.es" className="hover:text-navy-900 transition-colors">
                info@enisa.es
              </a>
              <span>C. Vicente Aleixandre, 28</span>
              <span>15009 A Coruña, Galicia</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
              Servicios
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-600 hover:text-navy-900 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
              Zonas
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              {["A Coruña ciudad", "Arteixo", "Oleiros", "Culleredo", "Cambre", "Sada", "Betanzos"].map(
                (z) => (
                  <li key={z}>{z}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
              Empresa
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Inicio", href: "/" },
                { name: "Quiénes somos", href: "/quienes-somos" },
                { name: "Reservar servicio", href: "/reservar" },
                { name: "Aviso legal", href: "/aviso-legal" },
                { name: "Política de privacidad", href: "/privacidad" },
                { name: "Política de cookies", href: "/cookies" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-600 hover:text-navy-900 transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span>© {year} Enisa Limpieza · Servicios para el Hogar · A Coruña</span>
        </div>
      </div>
    </footer>
  );
}
