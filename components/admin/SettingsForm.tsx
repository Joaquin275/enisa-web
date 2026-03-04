"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface SiteSettings {
  id: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
}

interface SlotConfig {
  id: string;
  slotDurationMinutes: number;
}

interface Props {
  settings: SiteSettings | null;
  slotConfig: SlotConfig | null;
}

export function SettingsForm({ settings, slotConfig }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: settings?.companyName ?? "",
    companyPhone: settings?.companyPhone ?? "",
    companyEmail: settings?.companyEmail ?? "",
    companyAddress: settings?.companyAddress ?? "",
    slotDurationMinutes: String(slotConfig?.slotDurationMinutes ?? 120),
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function save() {
    setLoading(true);
    setMsg("");
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slotDurationMinutes: parseInt(form.slotDurationMinutes) }),
    });
    setLoading(false);
    setMsg("Ajustes guardados correctamente");
    router.refresh();
  }

  return (
    <div className="max-w-lg">
      <div className="bg-white border border-gray-200 p-8 flex flex-col gap-5">
        <h3 className="font-semibold text-navy-950">Datos de la empresa</h3>

        <Input label="Nombre de la empresa" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        <Input label="Teléfono" value={form.companyPhone} onChange={(e) => setForm({ ...form, companyPhone: e.target.value })} />
        <Input label="Email" type="email" value={form.companyEmail} onChange={(e) => setForm({ ...form, companyEmail: e.target.value })} />
        <Input label="Dirección" value={form.companyAddress} onChange={(e) => setForm({ ...form, companyAddress: e.target.value })} />

        <div className="border-t border-gray-100 pt-5">
          <h3 className="font-semibold text-navy-950 mb-4">Configuración de slots</h3>
          <Input
            label="Duración de cada slot (minutos)"
            type="number"
            value={form.slotDurationMinutes}
            onChange={(e) => setForm({ ...form, slotDurationMinutes: e.target.value })}
          />
          <p className="text-xs text-gray-400 mt-2">
            Cambia la duración base de cada franja horaria (ej: 120 = 2 horas por slot).
          </p>
        </div>

        {msg && <p className="text-sm text-emerald-600 font-medium">{msg}</p>}

        <Button loading={loading} onClick={save}>
          Guardar ajustes
        </Button>
      </div>
    </div>
  );
}
