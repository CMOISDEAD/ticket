import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/auth/login", "/auth/register"];
const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("token");

  if (!cookie) return NextResponse.next();

  const token = cookie.value;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // Función para verificar el token y su expiración
  const verifyToken = async (token: string) => {
    console.log("token", token);
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(jwtSecret),
      );
      return payload && !payload.exp ? true : Date.now() < payload.exp! * 1000;
    } catch (error) {
      return false;
    }
  };

  if (isPublicRoute && !token) {
    return NextResponse.next();
  }

  // si el usuario tiene token pero es invalido
  if (cookie && !(await verifyToken(token))) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si el usuario intenta acceder a una ruta protegida
  if (isProtectedRoute) {
    if (!token || !(await verifyToken(token))) {
      // Redirigir al login si no hay token o el token es inválido o expirado
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Si el usuario intenta acceder a una ruta pública pero tiene un token válido
  if (isPublicRoute && token && (await verifyToken(token))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Permitir el acceso a la ruta solicitada si no se cumple ninguna de las condiciones anteriores
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
