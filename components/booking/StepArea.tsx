"use client";

import { useBookingStore } from "@/lib/booking-store";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  areas: { id: string; name: string }[];
  services?: unknown[];
}

export function StepArea({ areas }: Props) {
  const { areaId, setArea, setStep } = useBookingStore();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">¿En qué zona?</h2>
        <p className="text-gray-500 text-sm">
          Selecciona el municipio o zona donde se realizará el servicio.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => setArea(area.id, area.name)}
            className={cn(
              "p-4 border text-sm font-medium text-left transition-all duration-200",
              areaId === area.id
                ? "border-navy-900 bg-navy-950 text-white"
                : "border-gray-200 bg-white hover:border-navy-300 text-gray-700"
            )}
          >
            {area.name}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)}>
          Atrás
        </Button>
        <Button disabled={!areaId} onClick={() => setStep(3)}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
