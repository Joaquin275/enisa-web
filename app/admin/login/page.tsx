"use client";

import { useState, useTransition } from "react";
import { loginAction } from "./actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="text-lg font-bold text-white block">Enisa Limpieza</span>
          <span className="text-xs tracking-[0.25em] uppercase text-white/40 font-medium">Panel de administración</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 flex flex-col gap-5">
          <h1 className="text-xl font-bold text-navy-950 mb-2">Acceder</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            defaultValue=""
            autoComplete="email"
            required
          />
          <Input
            label="Contraseña"
            id="password"
            name="password"
            type="password"
            defaultValue=""
            autoComplete="current-password"
            required
          />

          <Button type="submit" loading={isPending} className="w-full mt-2">
            {isPending ? "Accediendo..." : "Entrar"}
          </Button>

          <p className="text-xs text-gray-400 text-center mt-1">
            Panel exclusivo para administradores
          </p>
        </form>
      </div>
    </div>
  );
}
