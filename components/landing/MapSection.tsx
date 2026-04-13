"use client";

// Coordenadas exactas extraídas del embed oficial de Google Maps
const LAT = 43.346389471118364;
const LNG = -8.402730524014798;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const ENCODED_ADDRESS = encodeURIComponent("C. Vicente Aleixandre, 28, 15009 A Coruña, España");

export function MapSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-navy-400 font-medium mb-4">
              Dónde estamos
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-navy-950 leading-tight mb-6">
              Ubicados en el<br />
              <span className="font-semibold">corazón de A Coruña</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Atendemos A Coruña ciudad y toda el área metropolitana: Arteixo, Oleiros,
              Culleredo, Cambre, Sada y Betanzos. Nos desplazamos hasta donde nos necesites.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-50 border border-navy-100">
                <div className="w-2 h-2 rounded-full bg-navy-600 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Dirección</p>
                  <p className="text-sm text-gray-600 mt-1">
                    C. Vicente Aleixandre, 28, 3 IZQ<br />
                    15009 A Coruña, Galicia
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-50 border border-navy-100">
                <div className="w-2 h-2 rounded-full bg-navy-600 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Teléfono</p>
                  <a
                    href="tel:+34691746730"
                    className="text-sm text-navy-600 hover:text-navy-900 transition-colors mt-1 block"
                  >
                    +34 691 74 67 30
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-50 border border-navy-100">
                <div className="w-2 h-2 rounded-full bg-navy-600 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Email</p>
                  <a
                    href="mailto:info@enisalimpieza.es"
                    className="text-sm text-navy-600 hover:text-navy-900 transition-colors mt-1 block"
                  >
                    info@enisalimpieza.es
                  </a>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${ENCODED_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-navy-900 border border-navy-900 px-6 py-3 rounded-xl hover:bg-navy-900 hover:text-white transition-all duration-200"
            >
              Ver en Google Maps →
            </a>
          </div>

          {/* Mapa */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[420px]">
            {API_KEY ? (
              <iframe
                title="Ubicación Enisa Limpieza — C. Vicente Aleixandre, 28, A Coruña"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${LAT},${LNG}&zoom=17&language=es`}
              />
            ) : (
              <div className="w-full h-full bg-navy-50 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Mapa no disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
