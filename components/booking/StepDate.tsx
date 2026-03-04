"use client";

import { useState } from "react";
import { useBookingStore } from "@/lib/booking-store";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { addDays, format, startOfWeek, isBefore, isToday, isSunday } from "date-fns";
import { es } from "date-fns/locale";

function generateCalendarDays(referenceDate: Date) {
  const start = startOfWeek(referenceDate, { weekStartsOn: 1 });
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export function StepDate({ services, areas }: { services?: unknown[]; areas?: unknown[] }) {
  const { date, setDate, setStep } = useBookingStore();
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = generateCalendarDays(viewDate);
  const monthLabel = format(viewDate, "MMMM yyyy", { locale: es });

  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const lastOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

  function handlePrevMonth() {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  }
  function handleNextMonth() {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  }

  function selectDay(day: Date) {
    const d = new Date(day);
    d.setHours(0, 0, 0, 0);
    if (isBefore(d, today) || isSunday(d)) return;
    setDate(format(d, "yyyy-MM-dd"));
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">¿Qué día?</h2>
        <p className="text-gray-500 text-sm">
          Elige una fecha a partir de mañana. Disponible de lunes a sábado.
        </p>
      </div>

      <div className="bg-white border border-gray-200 mb-8">
        {/* Month navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <button
            onClick={handlePrevMonth}
            disabled={isBefore(firstOfMonth, today)}
            className="p-2 text-gray-400 hover:text-navy-900 disabled:opacity-30 transition-colors"
          >
            ←
          </button>
          <span className="text-sm font-semibold text-navy-900 capitalize">{monthLabel}</span>
          <button
            onClick={handleNextMonth}
            className="p-2 text-gray-400 hover:text-navy-900 transition-colors"
          >
            →
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
            <div key={d} className={cn("py-3 text-center text-[10px] tracking-wide font-semibold uppercase", d === "Dom" ? "text-red-400" : "text-gray-400")}>
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const isCurrentMonth = day >= firstOfMonth && day <= lastOfMonth;
            const isPast = isBefore(day, today);
            const isSun = isSunday(day);
            const selected = date === format(day, "yyyy-MM-dd");
            const disabled = isPast || isSun;

            return (
              <button
                key={i}
                onClick={() => !disabled && selectDay(day)}
                disabled={disabled}
                className={cn(
                  "aspect-square flex items-center justify-center text-sm transition-all duration-150",
                  !isCurrentMonth && "opacity-30",
                  disabled && "cursor-not-allowed opacity-30",
                  selected && "bg-navy-950 text-white font-bold",
                  !selected && !disabled && "hover:bg-navy-50 text-gray-700",
                  isToday(day) && !selected && "border border-navy-200 font-semibold"
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(2)}>
          Atrás
        </Button>
        <Button disabled={!date} onClick={() => setStep(4)}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
