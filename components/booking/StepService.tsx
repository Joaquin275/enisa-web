"use client";

import { useBookingStore } from "@/lib/booking-store";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  services: { id: string; name: string; shortDescription: string }[];
  areas?: unknown[];
}

export function StepService({ services }: Props) {
  const { serviceId, setService, setStep } = useBookingStore();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">¿Qué servicio necesitas?</h2>
        <p className="text-gray-500 text-sm">Elige el tipo de limpieza que quieres contratar.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setService(service.id, service.name)}
            className={cn(
              "p-5 border text-left transition-all duration-200 hover:-translate-y-0.5",
              serviceId === service.id
                ? "border-navy-900 bg-navy-950 text-white shadow-lg"
                : "border-gray-200 bg-white hover:border-navy-300"
            )}
          >
            <div
              className={cn(
                "font-semibold text-sm mb-1.5",
                serviceId === service.id ? "text-white" : "text-navy-950"
              )}
            >
              {service.name}
            </div>
            <div
              className={cn(
                "text-xs leading-relaxed",
                serviceId === service.id ? "text-white/70" : "text-gray-500"
              )}
            >
              {service.shortDescription}
            </div>
          </button>
        ))}
      </div>

      <Button
        disabled={!serviceId}
        onClick={() => setStep(2)}
        size="lg"
        className="w-full sm:w-auto"
      >
        Continuar
      </Button>
    </div>
  );
}
