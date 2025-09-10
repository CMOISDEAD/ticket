import { NextRequest, NextResponse } from "next/server";
import { locales } from "@/config";
import createMiddleware from "next-intl/middleware";

// Crear el middleware de internacionalización
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

// Rutas que requieren autenticación
const protectedRoutes = [
  "/es/dashboard",
  "/en/dashboard",
  "/dashboard",
  "/es/cart",
  "/en/cart",
  "/cart",
  "/es/orders",
  "/en/orders",
  "/orders",
  "/es/payments",
  "/en/payments",
  "/payments",
];

// Rutas públicas (solo para usuarios no autenticados)
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/es/auth/login",
  "/es/auth/register",
  "/en/auth/login",
  "/en/auth/register",
];

// Función para verificar si una ruta coincide con los patrones
function isRouteMatch(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    // Coincidencia exacta
    if (pathname === route) return true;

    // Coincidencia para rutas que terminan con /*
    if (route.endsWith("/*")) {
      const baseRoute = route.slice(0, -2);
      return pathname.startsWith(baseRoute + "/") || pathname === baseRoute;
    }

    return false;
  });
}

// Función para verificar si el token es válido
function isValidToken(token: string | undefined): boolean {
  return (
    token !== undefined && token !== null && token !== "" && token.trim() !== ""
  );
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Primero ejecutar el middleware de internacionalización
  const intlResponse = intlMiddleware(req);

  // Obtener el token de las cookies
  const token = req.cookies.get("token")?.value;
  const hasValidToken = isValidToken(token);

  // Verificar si es una ruta protegida
  const isProtectedRoute = isRouteMatch(pathname, protectedRoutes);
  const isPublicRoute = isRouteMatch(pathname, publicRoutes);

  console.log({
    pathname,
    token,
    hasValidToken,
    isProtectedRoute,
    isPublicRoute,
  }); // Para debugging

  // Redirigir a login si intenta acceder a ruta protegida sin token válido
  if (isProtectedRoute && !hasValidToken) {
    const loginUrl = pathname.startsWith("/es")
      ? "/es/auth/login"
      : "/en/auth/login";
    return NextResponse.redirect(new URL(loginUrl, req.url));
  }

  // Redirigir al home si intenta acceder a rutas de auth teniendo token válido
  if (isPublicRoute && hasValidToken) {
    const homeUrl = pathname.startsWith("/es") ? "/es" : "/en";
    return NextResponse.redirect(new URL(homeUrl, req.url));
  }

  // Si hay una respuesta del middleware de internacionalización, devolverla
  if (intlResponse) {
    return intlResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
