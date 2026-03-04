"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBookingStore } from "@/lib/booking-store";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export function StepConfirmation({ services, areas }: { services?: unknown[]; areas?: unknown[] }) {
  const store = useBookingStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: store.serviceId,
          areaId: store.areaId,
          staffId: store.staffId,
          date: store.date,
          slotStart: store.slot?.start,
          slotEnd: store.slot?.end,
          customerName: store.customerName,
          customerEmail: store.customerEmail,
          customerPhone: store.customerPhone,
          address: store.address,
          notes: store.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al enviar la reserva");
      setBookingId(data.bookingId);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-navy-950 flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-navy-950 mb-4">Solicitud enviada</h2>
        <p className="text-gray-600 mb-2 max-w-md mx-auto leading-relaxed">
          Hemos recibido tu solicitud para el {store.serviceName} el{" "}
          {store.date && formatDate(new Date(store.date + "T00:00:00"))} de {store.slot?.start} a{" "}
          {store.slot?.end}.
        </p>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
          Recibirás un email de confirmación en <strong>{store.customerEmail}</strong>. Nos pondremos
          en contacto contigo en breve para confirmar todos los detalles.
        </p>
        {bookingId && (
          <p className="text-xs text-gray-400 font-mono mb-8">Ref: {bookingId}</p>
        )}
        <Button onClick={() => { store.reset(); window.location.href = "/"; }}>
          Volver al inicio
        </Button>
      </motion.div>
    );
  }

  const summaryRows = [
    { label: "Servicio", value: store.serviceName },
    { label: "Zona", value: store.areaName },
    { label: "Fecha", value: store.date ? formatDate(new Date(store.date + "T00:00:00")) : "" },
    { label: "Horario", value: store.slot ? `${store.slot.start} – ${store.slot.end}` : "" },
    { label: "Profesional", value: store.staffName },
    { label: "Nombre", value: store.customerName },
    { label: "Email", value: store.customerEmail },
    { label: "Teléfono", value: store.customerPhone },
    { label: "Dirección", value: store.address },
    ...(store.notes ? [{ label: "Notas", value: store.notes }] : []),
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">Resumen de tu solicitud</h2>
        <p className="text-gray-500 text-sm">
          Revisa los datos antes de enviar. Te enviaremos confirmación por email.
        </p>
      </div>

      <div className="bg-white border border-gray-200 mb-8">
        {summaryRows.map((row, i) => (
          <div
            key={i}
            className="flex justify-between items-start px-6 py-4 border-b border-gray-100 last:border-0"
          >
            <span className="text-xs font-semibold tracking-wide uppercase text-gray-400 flex-shrink-0 w-28">
              {row.label}
            </span>
            <span className="text-sm text-navy-950 text-right">{row.value}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-6 leading-relaxed">
        Al enviar esta solicitud aceptas nuestra{" "}
        <a href="/privacidad" className="underline hover:text-navy-900">
          política de privacidad
        </a>
        . Tu reserva quedará como <strong>pendiente de confirmación</strong> hasta que nos pongamos
        en contacto contigo.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-sm mb-6">{error}</div>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => store.setStep(5)}>
          Atrás
        </Button>
        <Button loading={loading} onClick={handleSubmit} size="lg">
          Confirmar solicitud
        </Button>
      </div>
    </div>
  );
}
