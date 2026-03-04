import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal | Enisa Limpieza",
  robots: { index: false },
};

const COMPANY = "Enisa Limpieza";
const ADDRESS = "C. Vicente Aleixandre, 28, 15009 A Coruña, Galicia";
const PHONE = "+34 691 74 67 30";
const EMAIL = "info@enisa.es";
const YEAR = new Date().getFullYear();

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <Link href="/" className="inline-block text-xs font-display tracking-widest uppercase text-navy-400 hover:text-navy-700 transition-colors mb-8">
          ← Volver al inicio
        </Link>

        <h1 className="font-display text-4xl font-bold text-navy-950 mb-2 tracking-tight">Aviso Legal</h1>
        <p className="text-xs text-gray-400 mb-10 font-sans">Última actualización: enero de {YEAR}</p>

        <div className="text-gray-700 space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">1. Datos del titular</h2>
            <div className="bg-white border border-gray-100 p-5 space-y-1">
              <p><strong>Denominación:</strong> {COMPANY}</p>
              <p><strong>Actividad:</strong> Servicios de limpieza y servicios para el hogar</p>
              <p><strong>Domicilio:</strong> {ADDRESS}</p>
              <p><strong>Teléfono:</strong>{" "}
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-navy-600 hover:underline">{PHONE}</a>
              </p>
              <p><strong>Email:</strong>{" "}
                <a href={`mailto:${EMAIL}`} className="text-navy-600 hover:underline">{EMAIL}</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">2. Objeto y ámbito de aplicación</h2>
            <p>
              El presente Aviso Legal regula el acceso y uso del sitio web de {COMPANY}, empresa dedicada a la prestación
              de servicios de limpieza profesional y servicios para el hogar (cuidado de niños, lavado, planchado y cocina)
              en A Coruña y área metropolitana.
            </p>
            <p className="mt-3">
              El acceso y la navegación por este sitio web implican la aceptación expresa de las condiciones recogidas en
              este Aviso Legal. Si no estás de acuerdo con ellas, te rogamos que no utilices este sitio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">3. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos de este sitio web —textos, imágenes, logotipos, diseño gráfico y código fuente— son
              propiedad de {COMPANY} o de sus legítimos licenciatarios y están protegidos por la legislación española e
              internacional sobre propiedad intelectual e industrial.
            </p>
            <p className="mt-3">
              Queda expresamente prohibida su reproducción, distribución, comunicación pública o transformación sin
              autorización previa y por escrito del titular.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">4. Exclusión de responsabilidad</h2>
            <p>
              {COMPANY} no se responsabiliza de los daños o perjuicios que pudieran derivarse del uso de la información
              contenida en este sitio web, ni de posibles errores u omisiones en su contenido. Los presupuestos mostrados
              tienen carácter orientativo; el precio definitivo se confirma tras la valoración del servicio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">5. Legislación aplicable y jurisdicción</h2>
            <p>
              Este sitio web se rige por la legislación española vigente. Para la resolución de cualquier controversia
              derivada del acceso o uso del mismo, las partes se someten expresamente a los Juzgados y Tribunales de
              A Coruña, con renuncia a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">6. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con este Aviso Legal puedes contactarnos en{" "}
              <a href={`mailto:${EMAIL}`} className="text-navy-600 hover:underline">{EMAIL}</a>{" "}
              o llamando al <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-navy-600 hover:underline">{PHONE}</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-xs text-gray-400">
          <Link href="/privacidad" className="hover:text-navy-700 transition-colors">Política de Privacidad</Link>
          <Link href="/cookies" className="hover:text-navy-700 transition-colors">Política de Cookies</Link>
        </div>
      </div>
    </div>
  );
}
