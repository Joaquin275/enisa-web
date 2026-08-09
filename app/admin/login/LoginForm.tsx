"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al iniciar sesión.");
        setLoading(false);
        return;
      }

      // Login correcto → ir al panel
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 flex flex-col gap-5 shadow-xl"
    >
      <h1 className="text-xl font-bold text-navy-950 mb-2">Acceder</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-xs font-semibold tracking-wide uppercase text-gray-500"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
          placeholder="info@enisalimpieza.es"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-xs font-semibold tracking-wide uppercase text-gray-500"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 px-8 py-3.5 bg-navy-900 text-white text-sm font-medium tracking-wide hover:bg-navy-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Verificando...
          </>
        ) : (
          "Entrar"
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Panel exclusivo para administradores de Enisa
      </p>
    </form>
  );
}
