"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/personal", label: "Personal" },
  { href: "/admin/disponibilidad", label: "Disponibilidad" },
  { href: "/admin/servicios", label: "Servicios" },
  { href: "/admin/ajustes", label: "Ajustes" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-navy-950 flex flex-col shrink-0">
      <div className="px-4 py-5 border-b border-white/10 flex items-center gap-3">
        <div className="relative h-8 w-8 rounded-full overflow-hidden ring-1 ring-white/20 shrink-0">
          <Image
            src="/images/Logo.Enisa.png"
            alt="Enisa"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-sm font-bold text-white">Enisa Limpieza</span>
          <span className="block text-[10px] tracking-[0.2em] uppercase text-white/30 mt-0.5">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2.5 text-sm font-medium transition-all duration-150 rounded-none",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="px-3 py-2.5 text-xs text-white/30 hover:text-white/60 transition-colors block"
        >
          Ver web →
        </Link>
      </div>
    </aside>
  );
}
