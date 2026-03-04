"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface StaffMember {
  id: string;
  name: string;
  bio: string | null;
  active: boolean;
  specialties: string[];
}

interface Props {
  initialStaff: StaffMember[];
}

export function StaffManager({ initialStaff }: Props) {
  const router = useRouter();
  const [staff, setStaff] = useState(initialStaff);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", bio: "", specialties: "" });
  const [loading, setLoading] = useState(false);

  function startEdit(member: StaffMember) {
    setEditId(member.id);
    setForm({ name: member.name, bio: member.bio ?? "", specialties: member.specialties.join(", ") });
    setShowForm(true);
  }

  function resetForm() {
    setEditId(null);
    setForm({ name: "", bio: "", specialties: "" });
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const url = editId ? `/api/admin/staff/${editId}` : "/api/admin/staff";
    const method = editId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        bio: form.bio,
        specialties: form.specialties.split(",").map((s) => s.trim()).filter(Boolean),
      }),
    });
    setLoading(false);
    resetForm();
    router.refresh();
  }

  async function toggleActive(member: StaffMember) {
    await fetch(`/api/admin/staff/${member.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !member.active }),
    });
    router.refresh();
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button onClick={() => { resetForm(); setShowForm(true); }} variant="outline" size="sm">
          + Añadir persona
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border border-navy-200 p-6 mb-6">
          <h3 className="font-semibold text-navy-950 mb-5">{editId ? "Editar" : "Nueva persona"}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Textarea label="Bio (breve)" rows={2} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            <Input label="Especialidades (separadas por coma)" placeholder="hogar, oficinas, cristales" value={form.specialties} onChange={(e) => setForm({ ...form, specialties: e.target.value })} />
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
              <Button type="submit" loading={loading}>Guardar</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 divide-y divide-gray-100">
        {staff.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">Sin personal añadido</div>
        )}
        {staff.map((member) => (
          <div key={member.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-navy-950">{member.name}</span>
                <span className={cn("text-xs px-2.5 py-0.5 font-medium", member.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500")}>
                  {member.active ? "Activa" : "Inactiva"}
                </span>
              </div>
              {member.bio && <p className="text-xs text-gray-500 mt-0.5">{member.bio}</p>}
              {member.specialties.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">{member.specialties.join(" · ")}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => startEdit(member)}>Editar</Button>
              <Button
                variant={member.active ? "danger" : "outline"}
                size="sm"
                onClick={() => toggleActive(member)}
              >
                {member.active ? "Desactivar" : "Activar"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
