/**
 * Sistema de sesión propio para el panel admin.
 * Usa JWT firmado con AUTH_SECRET guardado en cookie httpOnly.
 * No depende de NextAuth para el flujo de login.
 */

import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "enisa_admin_session";
const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 días en segundos

function getSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "fallback-dev-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

/** Crea un JWT firmado con los datos del admin */
export async function createAdminToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES_IN}s`)
    .sign(getSecret());
}

/** Verifica un JWT y devuelve el payload, o null si es inválido */
export async function verifyAdminToken(
  token: string
): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, EXPIRES_IN };
