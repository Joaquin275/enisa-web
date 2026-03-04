"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const statuses = ["PENDIENTE", "CONFIRMADA", "CANCELADA", "COMPLETADA"] as const;
type Status = (typeof statuses)[number];

interface Props {
  bookingId: string;
  currentStatus: string;
  currentStaffId: string;
  allStaff: { id: string; name: string }[];
}

const statusLabels: Record<Status, string> = {
  PENDIENTE: "Pendiente",
  CONFIRMADA: "Confirmar",
  CANCELADA: "Cancelar",
  COMPLETADA: "Completada",
};

export function BookingActions({ bookingId, currentStatus, currentStaffId, allStaff }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [staffId, setStaffId] = useState(currentStaffId);
  const [adminNotes, setAdminNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function save() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, staffId: staffId || undefined, adminNotes: adminNotes || undefined }),
      });
      if (!res.ok) throw new Error("Error");
      setMsg("Guardado correctamente");
      router.refresh();
    } catch {
      setMsg("Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 p-6 flex flex-col gap-5">
      <h3 className="font-semibold text-navy-950">Acciones</h3>

      <div>
        <label className="text-xs font-semibold tracking-wide uppercase text-gray-400 block mb-2">
          Estado
        </label>
        <div className="flex flex-col gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium text-left border transition-colors",
                status === s
                  ? "bg-navy-950 text-white border-navy-950"
                  : "border-gray-200 text-gray-600 hover:border-navy-200"
              )}
            >
              {statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold tracking-wide uppercase text-gray-400 block mb-2">
          Reasignar profesional
        </label>
        <select
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 text-sm text-gray-700 bg-white outline-none focus:border-navy-600"
        >
          <option value="">Sin asignar</option>
          {allStaff.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold tracking-wide uppercase text-gray-400 block mb-2">
          Notas internas
        </label>
        <textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2.5 border border-gray-200 text-sm text-gray-700 bg-white outline-none focus:border-navy-600 resize-none"
          placeholder="Notas solo visibles para el admin..."
        />
      </div>

      {msg && (
        <p className={`text-xs font-medium ${msg.includes("Error") ? "text-red-600" : "text-emerald-600"}`}>
          {msg}
        </p>
      )}

      <Button loading={loading} onClick={save} className="w-full">
        Guardar cambios
      </Button>
    </div>
  );
}
