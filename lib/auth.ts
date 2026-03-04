import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

// Credenciales demo (cuando la BD no está configurada)
const DEMO_EMAIL = process.env.DEMO_ADMIN_EMAIL ?? "admin@enisa.es";
const DEMO_PASSWORD = process.env.DEMO_ADMIN_PASSWORD ?? "admin123";

export const { handlers, auth, signIn, signOut } = NextAuth({
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

        // 1. Intentar con la base de datos real
        try {
          const { prisma } = await import("@/lib/prisma");
          const user = await prisma.user.findUnique({ where: { email } });
          if (user) {
            const valid = await bcrypt.compare(password, user.passwordHash);
            if (!valid) return null;
            return { id: user.id, email: user.email, name: user.name ?? undefined, role: user.role };
          }
        } catch {
          // DB no disponible → continuar con modo demo
        }

        // 2. Modo demo: credenciales hardcodeadas cuando no hay BD
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
