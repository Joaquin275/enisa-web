import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminRoute || isAdminApi) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      if (isAdminApi) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const payload = await verifyAdminToken(token);

    if (!payload) {
      // Token inválido o expirado
      const response = isAdminApi
        ? NextResponse.json({ error: "Sesión expirada" }, { status: 401 })
        : NextResponse.redirect(new URL("/admin/login", req.url));
      // Borrar cookie inválida
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
