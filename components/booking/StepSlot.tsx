"use client";

import { useState, useEffect } from "react";
import { useBookingStore } from "@/lib/booking-store";
import { Button } from "@/components/ui/Button";
import { cn, formatDate } from "@/lib/utils";

interface SlotData {
  slot: { start: string; end: string };
  availableStaff: { id: string; name: string; bio?: string | null }[];
}

export function StepSlot({ services, areas }: { services?: unknown[]; areas?: unknown[] }) {
  const { date, slot, staffId, setSlot, setStaff, setStep } = useBookingStore();
  const [slotsData, setSlotsData] = useState<SlotData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(slot ? `${slot.start}-${slot.end}` : "");

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date }),
        });
        if (!res.ok) throw new Error("Error al cargar disponibilidad");
        const data = await res.json();
        setSlotsData(data.slots ?? []);
      } catch {
        setError("No hemos podido cargar la disponibilidad. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
    if (date) fetchSlots();
  }, [date]);

  function handleSlotSelect(slotData: SlotData) {
    const key = `${slotData.slot.start}-${slotData.slot.end}`;
    setSelectedSlot(key);
    setSlot(slotData.slot);
    setStaff("", "");
  }

  const selectedSlotData = slotsData.find(
    (s) => `${s.slot.start}-${s.slot.end}` === selectedSlot
  );

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">¿A qué hora?</h2>
        <p className="text-gray-500 text-sm">
          {date && `Disponibilidad para el ${formatDate(new Date(date + "T00:00:00"))}.`}
        </p>
      </div>

      {loading && (
        <div className="py-16 text-center">
          <div className="inline-block w-8 h-8 border-2 border-navy-200 border-t-navy-900 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm mt-4">Cargando disponibilidad...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-sm mb-6">{error}</div>
      )}

      {!loading && !error && slotsData.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 p-6 mb-6">
          <p className="text-amber-800 font-medium">No hay disponibilidad para esta fecha.</p>
          <p className="text-amber-700 text-sm mt-1">Por favor, elige otro día.</p>
        </div>
      )}

      {!loading && slotsData.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {slotsData.map((slotData) => {
              const key = `${slotData.slot.start}-${slotData.slot.end}`;
              const isSelected = selectedSlot === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSlotSelect(slotData)}
                  className={cn(
                    "p-4 border text-center transition-all duration-200",
                    isSelected
                      ? "border-navy-900 bg-navy-950 text-white"
                      : "border-gray-200 bg-white hover:border-navy-300 text-gray-700"
                  )}
                >
                  <div className={cn("font-semibold text-sm", isSelected ? "text-white" : "text-navy-900")}>
                    {slotData.slot.start} – {slotData.slot.end}
                  </div>
                  <div className={cn("text-xs mt-1", isSelected ? "text-white/60" : "text-gray-400")}>
                    {slotData.availableStaff.length} disponible{slotData.availableStaff.length !== 1 ? "s" : ""}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedSlotData && (
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-wide uppercase text-gray-400 mb-3">
                Elige profesional
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedSlotData.availableStaff.map((staff) => (
                  <button
                    key={staff.id}
                    onClick={() => setStaff(staff.id, staff.name)}
                    className={cn(
                      "p-4 border text-left transition-all duration-200",
                      staffId === staff.id
                        ? "border-navy-900 bg-navy-50"
                        : "border-gray-200 bg-white hover:border-navy-200"
                    )}
                  >
                    <div className="font-semibold text-sm text-navy-950">{staff.name}</div>
                    {staff.bio && (
                      <div className="text-xs text-gray-500 mt-1 leading-relaxed">{staff.bio}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(3)}>
          Atrás
        </Button>
        <Button disabled={!slot || !staffId} onClick={() => setStep(5)}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
