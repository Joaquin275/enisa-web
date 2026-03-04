"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { weekdayName } from "@/lib/utils";

interface Rule {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
}

interface Exception {
  id: string;
  date: Date | string;
  startTime: string | null;
  endTime: string | null;
  reason: string | null;
}

interface StaffWithAvailability {
  id: string;
  name: string;
  availabilityRules: Rule[];
  availabilityExceptions: Exception[];
}

const WEEKDAYS = [1, 2, 3, 4, 5, 6, 0];

export function AvailabilityManager({ staff }: { staff: StaffWithAvailability[] }) {
  const router = useRouter();
  const [selectedStaff, setSelectedStaff] = useState(staff[0]?.id ?? "");
  const [ruleForm, setRuleForm] = useState({ weekday: "1", startTime: "09:00", endTime: "13:00" });
  const [exForm, setExForm] = useState({ date: "", startTime: "", endTime: "", reason: "" });
  const [loading, setLoading] = useState(false);

  const current = staff.find((s) => s.id === selectedStaff);

  async function addRule() {
    setLoading(true);
    await fetch("/api/admin/availability-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staffId: selectedStaff, ...ruleForm, weekday: parseInt(ruleForm.weekday) }),
    });
    setLoading(false);
    router.refresh();
  }

  async function deleteRule(ruleId: string) {
    await fetch(`/api/admin/availability-rules/${ruleId}`, { method: "DELETE" });
    router.refresh();
  }

  async function addException() {
    setLoading(true);
    await fetch("/api/admin/exceptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staffId: selectedStaff, ...exForm }),
    });
    setLoading(false);
    setExForm({ date: "", startTime: "", endTime: "", reason: "" });
    router.refresh();
  }

  async function deleteException(exId: string) {
    await fetch(`/api/admin/exceptions/${exId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      {/* Staff selector */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {staff.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStaff(s.id)}
            className={`px-4 py-2 text-sm font-medium border transition-colors ${
              selectedStaff === s.id
                ? "bg-navy-950 text-white border-navy-950"
                : "border-gray-200 text-gray-600 hover:border-navy-200"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {current && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Horario base */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="font-semibold text-navy-950 mb-5">Horario semanal base</h3>

            <div className="mb-5 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Día</label>
                  <select
                    value={ruleForm.weekday}
                    onChange={(e) => setRuleForm({ ...ruleForm, weekday: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm bg-white outline-none focus:border-navy-600"
                  >
                    {WEEKDAYS.map((d) => (
                      <option key={d} value={d}>{weekdayName(d)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Desde</label>
                  <input
                    type="time"
                    value={ruleForm.startTime}
                    onChange={(e) => setRuleForm({ ...ruleForm, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm bg-white outline-none focus:border-navy-600"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Hasta</label>
                  <input
                    type="time"
                    value={ruleForm.endTime}
                    onChange={(e) => setRuleForm({ ...ruleForm, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm bg-white outline-none focus:border-navy-600"
                  />
                </div>
              </div>
              <Button size="sm" loading={loading} onClick={addRule}>Añadir horario</Button>
            </div>

            <div className="divide-y divide-gray-100">
              {current.availabilityRules.length === 0 && (
                <p className="text-xs text-gray-400 py-2">Sin horarios definidos</p>
              )}
              {current.availabilityRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between py-3">
                  <span className="text-sm text-navy-950">
                    <span className="font-medium">{weekdayName(rule.weekday)}</span>
                    <span className="text-gray-500 ml-2">{rule.startTime} – {rule.endTime}</span>
                  </span>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Excepciones / bloqueos */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="font-semibold text-navy-950 mb-5">Bloqueos y vacaciones</h3>

            <div className="mb-5 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Fecha</label>
                  <input
                    type="date"
                    value={exForm.date}
                    onChange={(e) => setExForm({ ...exForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm bg-white outline-none focus:border-navy-600"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Desde (vacío=todo el día)</label>
                  <input
                    type="time"
                    value={exForm.startTime}
                    onChange={(e) => setExForm({ ...exForm, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm bg-white outline-none focus:border-navy-600"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Hasta</label>
                  <input
                    type="time"
                    value={exForm.endTime}
                    onChange={(e) => setExForm({ ...exForm, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm bg-white outline-none focus:border-navy-600"
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Motivo (opcional)"
                value={exForm.reason}
                onChange={(e) => setExForm({ ...exForm, reason: e.target.value })}
                className="px-3 py-2 border border-gray-200 text-sm bg-white outline-none focus:border-navy-600 w-full"
              />
              <Button size="sm" loading={loading} onClick={addException} disabled={!exForm.date}>
                Añadir bloqueo
              </Button>
            </div>

            <div className="divide-y divide-gray-100">
              {current.availabilityExceptions.length === 0 && (
                <p className="text-xs text-gray-400 py-2">Sin bloqueos registrados</p>
              )}
              {current.availabilityExceptions.map((ex) => (
                <div key={ex.id} className="flex items-center justify-between py-3">
                  <span className="text-sm text-navy-950">
                    <span className="font-medium">{new Date(ex.date).toLocaleDateString("es-ES")}</span>
                    {ex.startTime && <span className="text-gray-500 ml-2">{ex.startTime} – {ex.endTime}</span>}
                    {!ex.startTime && <span className="text-gray-500 ml-2">Todo el día</span>}
                    {ex.reason && <span className="text-xs text-gray-400 ml-2">({ex.reason})</span>}
                  </span>
                  <button
                    onClick={() => deleteException(ex.id)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
