"use client";

import { motion } from "framer-motion";
import { ImageSlotLight } from "@/components/ui/ImageSlot";

const photos = [
  { label: "Limpieza de hogar", aspect: "portrait" as const, span: "row-span-2" },
  { label: "Limpieza de oficina", aspect: "landscape" as const, span: "" },
  { label: "Final de obra", aspect: "landscape" as const, span: "" },
  { label: "Mantenimiento del hogar", aspect: "landscape" as const, span: "" },
];

export function Gallery() {
  return (
    <section className="py-20 lg:py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="section-label">Nuestro trabajo</span>
            <h2 className="section-title mt-3">
              Resultados que
              <br />
              hablan por sí solos
            </h2>
          </div>
          <p className="hidden md:block text-sm text-gray-400 max-w-xs text-right leading-relaxed">
            Añade aquí fotos reales de tus trabajos para generar confianza y mostrar el nivel de calidad.
          </p>
        </motion.div>

        {/* Grid asimétrico */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {/* Imagen grande a la izquierda — ocupa 2 filas */}
          <div className="row-span-2 col-span-1">
            <ImageSlotLight
              /* src="/images/trabajo-hogar.jpg" */
              label="Foto de trabajo — hogar"
              aspectRatio="auto"
              className="h-full min-h-[320px]"
            />
          </div>

          {/* 3 imágenes en las celdas restantes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <ImageSlotLight
              /* src="/images/trabajo-oficina.jpg" */
              label="Foto de trabajo — oficina"
              aspectRatio="landscape"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ImageSlotLight
              /* src="/images/trabajo-obra.jpg" */
              label="Foto de trabajo — final de obra"
              aspectRatio="landscape"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <ImageSlotLight
              /* src="/images/trabajo-cristales.jpg" */
              label="Foto de trabajo — cristales"
              aspectRatio="landscape"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <ImageSlotLight
              /* src="/images/trabajo-zonas.jpg" */
              label="Foto de trabajo — zonas comunes"
              aspectRatio="landscape"
            />
          </motion.div>
        </motion.div>

        {/* Nota instruccional discreta */}
        <p className="mt-5 text-xs text-gray-400 text-center">
          Para añadir tus fotos reales, descomenta <code className="bg-gray-100 px-1.5 py-0.5 text-gray-500">src=</code> en{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 text-gray-500">components/landing/Gallery.tsx</code> y coloca las imágenes en{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 text-gray-500">public/images/</code>
        </p>
      </div>
    </section>
  );
}
