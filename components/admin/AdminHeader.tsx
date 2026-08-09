"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      <div />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="text-gray-500 hover:text-gray-800"
      >
        Cerrar sesión
      </Button>
    </header>
  );
}
