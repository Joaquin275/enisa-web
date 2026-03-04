"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function AdminHeader() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      <div />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="text-gray-500 hover:text-gray-800"
      >
        Cerrar sesión
      </Button>
    </header>
  );
}
