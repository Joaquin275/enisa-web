"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  active: boolean;
  baseDurationMinutes: number;
}

export function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const router = useRouter();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    baseDurationMinutes: "120",
  });
  const [loading, setLoading] = useState(false);

  function startEdit(s: Service) {
    setEditId(s.id);
    setForm({
      name: s.name,
      slug: s.slug,
      shortDescription: s.shortDescription,
      baseDurationMinutes: String(s.baseDurationMinutes),
    });
  }

  async function save() {
    if (!editId) return;
    setLoading(true);
    await fetch(`/api/admin/services/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, baseDurationMinutes: parseInt(form.baseDurationMinutes) }),
    });
    setLoading(false);
    setEditId(null);
    router.refresh();
  }

  async function toggleActive(service: Service) {
    await fetch(`/api/admin/services/${service.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !service.active }),
    });
    router.refresh();
  }

  return (
    <div>
      {editId && (
        <div className="bg-white border border-navy-200 p-6 mb-6">
          <h3 className="font-semibold text-navy-950 mb-5">Editar servicio</h3>
          <div className="flex flex-col gap-4">
            <Input label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Slug (URL)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <Textarea label="Descripción corta" rows={2} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            <Input label="Duración estimada (minutos)" type="number" value={form.baseDurationMinutes} onChange={(e) => setForm({ ...form, baseDurationMinutes: e.target.value })} />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setEditId(null)}>Cancelar</Button>
              <Button loading={loading} onClick={save}>Guardar</Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 divide-y divide-gray-100">
        {initialServices.map((s) => (
          <div key={s.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-navy-950">{s.name}</span>
                <span className={cn("text-xs px-2.5 py-0.5 font-medium", s.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500")}>
                  {s.active ? "Activo" : "Inactivo"}
                </span>
              </div>
              <span className="text-xs text-gray-400 font-mono">/servicios/{s.slug}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => startEdit(s)}>Editar</Button>
              <Button variant={s.active ? "danger" : "outline"} size="sm" onClick={() => toggleActive(s)}>
                {s.active ? "Ocultar" : "Activar"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
