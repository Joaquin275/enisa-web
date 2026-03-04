import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, addMinutes, parse } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, fmt = "d 'de' MMMM, yyyy") {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, fmt, { locale: es });
}

export function formatTime(time: string) {
  return time.slice(0, 5);
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function generateSlots(
  windowStart: string,
  windowEnd: string,
  durationMinutes: number
): Array<{ start: string; end: string }> {
  const slots: Array<{ start: string; end: string }> = [];
  let current = timeToMinutes(windowStart);
  const end = timeToMinutes(windowEnd);
  while (current + durationMinutes <= end) {
    slots.push({
      start: minutesToTime(current),
      end: minutesToTime(current + durationMinutes),
    });
    current += durationMinutes;
  }
  return slots;
}

export function weekdayName(weekday: number): string {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return days[weekday];
}

export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDIENTE: "Pendiente",
    CONFIRMADA: "Confirmada",
    CANCELADA: "Cancelada",
    COMPLETADA: "Completada",
  };
  return labels[status] ?? status;
}

export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDIENTE: "bg-amber-100 text-amber-800",
    CONFIRMADA: "bg-emerald-100 text-emerald-800",
    CANCELADA: "bg-red-100 text-red-800",
    COMPLETADA: "bg-navy-100 text-navy-800",
  };
  return colors[status] ?? "bg-gray-100 text-gray-800";
}
