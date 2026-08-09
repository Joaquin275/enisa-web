import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  createAdminToken,
  COOKIE_NAME,
  EXPIRES_IN,
} from "@/lib/admin-session";

// Credenciales del superadministrador
const SUPER_EMAIL =
  process.env.ADMIN_LOGIN_EMAIL ?? "info@enisalimpieza.es";
const SUPER_PASSWORD =
  process.env.ADMIN_LOGIN_PASSWORD ?? "An220420*";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email as string)?.toLowerCase().trim();
    const password = body.password as string;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos." },
        { status: 400 }
      );
    }

    let adminPayload = null;

    // 1. Superadmin hardcodeado — siempre funciona aunque la BD esté caída
    if (
      email === SUPER_EMAIL.toLowerCase() &&
      password === SUPER_PASSWORD
    ) {
      adminPayload = {
        id: "superadmin",
        email: SUPER_EMAIL,
        name: "Enisa · Superadministrador",
        role: "SUPERADMIN",
      };
    }

    // 2. Buscar en base de datos (con timeout de 5s)
    if (!adminPayload) {
      try {
        const { prisma } = await import("@/lib/prisma");
        const dbUser = await Promise.race([
          prisma.user.findUnique({ where: { email } }),
          new Promise<null>((_, rej) =>
            setTimeout(() => rej(new Error("TIMEOUT")), 5000)
          ),
        ]);

        if (dbUser) {
          const valid = await bcrypt.compare(password, dbUser.passwordHash);
          if (valid) {
            adminPayload = {
              id: dbUser.id,
              email: dbUser.email,
              name: dbUser.name ?? "Administrador",
              role: dbUser.role,
            };
          }
        }
      } catch {
        // BD no disponible — solo usamos superadmin hardcodeado
      }
    }

    if (!adminPayload) {
      return NextResponse.json(
        { error: "Email o contraseña incorrectos." },
        { status: 401 }
      );
    }

    // Crear token JWT
    const token = await createAdminToken(adminPayload);

    // Preparar la respuesta con la cookie
    const response = NextResponse.json({ ok: true, name: adminPayload.name });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: EXPIRES_IN,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[ADMIN LOGIN]", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
