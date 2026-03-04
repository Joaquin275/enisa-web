"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageSlotProps {
  src?: string;
  alt?: string;
  label?: string;            // texto que aparece en el placeholder
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide" | "auto";
  priority?: boolean;
}

const aspectClasses = {
  square:    "aspect-square",
  portrait:  "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide:      "aspect-[16/9]",
  auto:      "h-full",
};

/**
 * Espacio para foto.
 * - Sin src → muestra un placeholder con instrucción para sustituir.
 * - Con src → muestra la imagen real con next/image (optimizada).
 *
 * Para usar la imagen real simplemente pasa `src="/ruta/a/tu/foto.jpg"`.
 */
export function ImageSlot({
  src,
  alt = "Foto del equipo",
  label = "Añade tu foto aquí",
  className,
  aspectRatio = "landscape",
  priority = false,
}: ImageSlotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full",
        aspectRatio !== "auto" && aspectClasses[aspectRatio],
        !src && "bg-navy-950",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        /* Placeholder elegante */
        <>
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Corner marks */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/30" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/30" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/30" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/30" />
          {/* Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-px bg-white/20" />
            <span className="font-display text-[10px] tracking-[0.25em] uppercase text-white/30 text-center px-6">
              {label}
            </span>
            <div className="w-10 h-px bg-white/20" />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Versión para fondos claros (secciones blancas/crema)
 */
export function ImageSlotLight({
  src,
  alt = "Foto del equipo",
  label = "Añade tu foto aquí",
  className,
  aspectRatio = "landscape",
  priority = false,
}: ImageSlotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full",
        aspectRatio !== "auto" && aspectClasses[aspectRatio],
        !src && "bg-gray-100",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #0e1f33 1px, transparent 1px), linear-gradient(to bottom, #0e1f33 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-navy-300/60" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-navy-300/60" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-navy-300/60" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-navy-300/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-px bg-navy-300" />
            <span className="font-display text-[10px] tracking-[0.25em] uppercase text-navy-400 text-center px-6">
              {label}
            </span>
            <div className="w-10 h-px bg-navy-300" />
          </div>
        </>
      )}
    </div>
  );
}
