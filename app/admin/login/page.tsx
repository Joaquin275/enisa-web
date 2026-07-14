import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Acceder | Panel Admin · Enisa Limpieza",
  robots: { index: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="text-lg font-bold text-white block tracking-wide">
            Enisa Limpieza
          </span>
          <span className="text-xs tracking-[0.25em] uppercase text-white/40 font-medium">
            Panel de administración
          </span>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
