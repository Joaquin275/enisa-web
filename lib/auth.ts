import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

// Superadministrador principal
const ADMIN_EMAIL = process.env.ADMIN_LOGIN_EMAIL ?? "info@enisalimpieza.es";
const ADMIN_PASSWORD = process.env.ADMIN_LOGIN_PASSWORD ?? "An220420*";

// Credenciales demo secundarias
const DEMO_EMAIL = process.env.DEMO_ADMIN_EMAIL ?? "admin@enisa.es";
const DEMO_PASSWORD = process.env.DEMO_ADMIN_PASSWORD ?? "admin123";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // 1. Superadmin hardcodeado — acceso garantizado sin BD
        if (
          email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
          password === ADMIN_PASSWORD
        ) {
          return {
            id: "superadmin",
            email: ADMIN_EMAIL,
            name: "Enisa · Superadministrador",
            role: "SUPERADMIN",
          };
        }

        // 2. Intentar con la base de datos (con timeout de 5s para evitar bloqueos)
        try {
          const { prisma } = await import("@/lib/prisma");
          const userPromise = prisma.user.findUnique({ where: { email } });
          const timeoutPromise = new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error("DB_TIMEOUT")), 5000)
          );
          const user = await Promise.race([userPromise, timeoutPromise]);
          if (user) {
            const valid = await bcrypt.compare(password, user.passwordHash);
            if (!valid) return null;
            return { id: user.id, email: user.email, name: user.name ?? undefined, role: user.role };
          }
        } catch {
          // DB no disponible o timeout → continuar
        }

        // 3. Credenciales demo secundarias
        if (
          email.toLowerCase() === DEMO_EMAIL.toLowerCase() &&
          password === DEMO_PASSWORD
        ) {
          return {
            id: "demo-admin",
            email: DEMO_EMAIL,
            name: "Administrador (Demo)",
            role: "SUPERADMIN",
          };
        }

        return null;
      },
    }),
  ],
});
