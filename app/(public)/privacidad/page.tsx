import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | Enisa Limpieza",
  robots: { index: false },
};

const COMPANY = "Enisa Limpieza";
const ADDRESS = "C. Vicente Aleixandre, 28, 15009 A Coruña, Galicia";
const PHONE = "+34 691 74 67 30";
const EMAIL = "info@enisalimpieza.es";
const YEAR = new Date().getFullYear();

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <Link href="/" className="inline-block text-xs font-display tracking-widest uppercase text-navy-400 hover:text-navy-700 transition-colors mb-8">
          ← Volver al inicio
        </Link>

        <h1 className="font-display text-4xl font-bold text-navy-950 mb-2 tracking-tight">Política de Privacidad</h1>
        <p className="text-xs text-gray-400 mb-10 font-sans">Última actualización: enero de {YEAR}</p>

        <div className="text-gray-700 space-y-8 text-sm leading-relaxed">

          <p>
            En cumplimiento del <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y la <strong>Ley Orgánica 3/2018 (LOPDGDD)</strong>,
            {" "}{COMPANY} te informa sobre el tratamiento de tus datos personales recogidos a través de este sitio web.
          </p>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">1. Responsable del tratamiento</h2>
            <div className="bg-white border border-gray-100 p-5 space-y-1">
              <p><strong>Denominación:</strong> {COMPANY}</p>
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
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">2. Datos que recopilamos</h2>
            <p>A través del formulario de solicitud de presupuesto/reserva recogemos:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Nombre y apellidos</li>
              <li>Teléfono de contacto</li>
              <li>Dirección de email</li>
              <li>Dirección del servicio y zona</li>
              <li>Tipo de servicio solicitado, fecha y horario preferidos</li>
              <li>Cualquier observación o comentario que incluyas voluntariamente</li>
            </ul>
            <p className="mt-3">
              No recopilamos datos especialmente sensibles ni datos de menores de 14 años sin consentimiento del tutor legal.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">3. Finalidad y base legal del tratamiento</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-100 mt-2">
                <thead>
                  <tr className="bg-navy-950 text-white">
                    <th className="text-left p-3 font-display font-semibold">Finalidad</th>
                    <th className="text-left p-3 font-display font-semibold">Base legal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="p-3">Gestionar tu solicitud de presupuesto o reserva</td>
                    <td className="p-3">Consentimiento del interesado (art. 6.1.a RGPD)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3">Prestación del servicio contratado y facturación</td>
                    <td className="p-3">Ejecución del contrato (art. 6.1.b RGPD)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3">Envío de comunicaciones sobre el estado de tu servicio</td>
                    <td className="p-3">Interés legítimo (art. 6.1.f RGPD)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3">Cumplimiento de obligaciones legales y fiscales</td>
                    <td className="p-3">Obligación legal (art. 6.1.c RGPD)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">4. Cesión de datos a terceros</h2>
            <p>
              {COMPANY} <strong>no cede ni vende tus datos personales a terceros</strong> con fines comerciales.
              Únicamente podrán acceder a tus datos los profesionales de {COMPANY} que gestionen tu servicio,
              y los proveedores de servicios técnicos (alojamiento web, plataforma de email) que actúan como
              encargados del tratamiento bajo acuerdo de confidencialidad conforme al RGPD.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">5. Conservación de los datos</h2>
            <p>
              Tus datos se conservarán durante el tiempo necesario para la prestación del servicio y, una vez
              finalizada la relación, durante los plazos legalmente exigibles (p. ej., 5 años para obligaciones
              mercantiles y 4 años para obligaciones fiscales). Transcurridos dichos plazos, los datos serán
              eliminados de forma segura.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">6. Tus derechos</h2>
            <p>De acuerdo con el RGPD tienes derecho a:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tus datos.</li>
              <li><strong>Limitación:</strong> solicitar que suspendamos el tratamiento.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento en determinados supuestos.</li>
            </ul>
            <p className="mt-3">
              Puedes ejercer estos derechos escribiendo a{" "}
              <a href={`mailto:${EMAIL}`} className="text-navy-600 hover:underline">{EMAIL}</a>{" "}
              o por correo postal a {ADDRESS}, indicando tu nombre, DNI y el derecho que deseas ejercer.
            </p>
            <p className="mt-3">
              Si consideras que el tratamiento no es conforme a la normativa, puedes presentar una reclamación
              ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en{" "}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:underline">www.aepd.es</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-navy-950 mb-3">7. Seguridad</h2>
            <p>
              {COMPANY} aplica medidas técnicas y organizativas adecuadas para garantizar la seguridad de tus datos
              y evitar su pérdida, alteración, acceso no autorizado o cualquier otro tratamiento ilícito.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-xs text-gray-400">
          <Link href="/aviso-legal" className="hover:text-navy-700 transition-colors">Aviso Legal</Link>
          <Link href="/cookies" className="hover:text-navy-700 transition-colors">Política de Cookies</Link>
        </div>
      </div>
    </div>
  );
}

