import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies | Enisa Limpieza",
  robots: { index: false },
};

const COMPANY = "Enisa Limpieza";
const EMAIL = "info@enisa.es";
const YEAR = new Date().getFullYear();

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <Link href="/" className="inline-block text-xs font-display tracking-widest uppercase text-navy-400 hover:text-navy-700 transition-colors mb-8">
          ← Volver al inicio
        </Link>

        <h1 className="font-display text-4xl font-bold text-navy-950 mb-2 tracking-tight">Política de Cookies</h1>
        <p className="text-xs text-gray-400 mb-10 font-sans">Última actualización: enero de {YEAR}</p>

        <div className="text-gray-700 space-y-8 text-sm leading-relaxed">

          <p>
            En cumplimiento del artículo 22.2 de la <strong>Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI)</strong>,
            {" "}{COMPANY} te informa sobre el uso de cookies en este sitio web.
          </p>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web almacena en tu navegador cuando lo visitas.
              Permiten al sitio recordar información sobre tu visita para mejorar tu experiencia y el funcionamiento de la web.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">Cookies que utilizamos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-100 mt-2">
                <thead>
                  <tr className="bg-navy-950 text-white">
                    <th className="text-left p-3 font-display font-semibold">Cookie</th>
                    <th className="text-left p-3 font-display font-semibold">Tipo</th>
                    <th className="text-left p-3 font-display font-semibold">Finalidad</th>
                    <th className="text-left p-3 font-display font-semibold">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="p-3 font-mono">next-auth.session-token</td>
                    <td className="p-3">Técnica · Propia</td>
                    <td className="p-3">Mantiene la sesión del panel de administración. Solo activa si accedes como administrador.</td>
                    <td className="p-3">Sesión</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-mono">__Secure-next-auth*</td>
                    <td className="p-3">Técnica · Propia</td>
                    <td className="p-3">Seguridad CSRF para el formulario de autenticación (admin).</td>
                    <td className="p-3">Sesión</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-mono">booking_wizard</td>
                    <td className="p-3">Técnica · Propia</td>
                    <td className="p-3">Guarda el progreso del formulario de solicitud de presupuesto para no perder los datos si recargas la página.</td>
                    <td className="p-3">Sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Este sitio web <strong>no utiliza cookies de seguimiento, analítica ni publicidad</strong> de terceros.
              No se instalan cookies de Google Analytics, Meta Pixel ni similares.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">Cookies de terceros</h2>
            <p>
              Actualmente este sitio web no incorpora servicios de terceros que instalen cookies propias
              (redes sociales, mapas, vídeos embebidos, publicidad, etc.). Si en el futuro se integraran,
              esta política se actualizará e informará debidamente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">¿Cómo gestionar las cookies?</h2>
            <p>
              Puedes configurar tu navegador para bloquear o eliminar las cookies. Ten en cuenta que deshabilitar
              las cookies técnicas puede afectar al correcto funcionamiento del formulario de reserva y del
              panel de administración.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong>Chrome:</strong>{" "}
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:underline">
                  Configuración → Privacidad → Cookies
                </a>
              </li>
              <li>
                <strong>Firefox:</strong>{" "}
                <a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:underline">
                  Preferencias → Privacidad → Cookies
                </a>
              </li>
              <li>
                <strong>Safari:</strong>{" "}
                Preferencias → Privacidad → Bloquear todas las cookies
              </li>
              <li>
                <strong>Edge:</strong>{" "}
                Configuración → Privacidad, búsqueda y servicios → Cookies
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">Actualizaciones de esta política</h2>
            <p>
              {COMPANY} puede modificar esta Política de Cookies en cualquier momento para adaptarla a novedades
              legislativas o cambios en los servicios del sitio. Te recomendamos revisarla periódicamente.
              Para cualquier consulta, escríbenos a{" "}
              <a href={`mailto:${EMAIL}`} className="text-navy-600 hover:underline">{EMAIL}</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-xs text-gray-400">
          <Link href="/aviso-legal" className="hover:text-navy-700 transition-colors">Aviso Legal</Link>
          <Link href="/privacidad" className="hover:text-navy-700 transition-colors">Política de Privacidad</Link>
        </div>
      </div>
    </div>
  );
}
