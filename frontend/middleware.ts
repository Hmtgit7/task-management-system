// middleware.ts (root of frontend/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authStorage = request.cookies.get("auth-storage");

  let isAuthenticated = false;
  if (authStorage?.value) {
    try {
      const parsed = JSON.parse(authStorage.value);
      // Zustand persist stores data in { state: {...} } format
      isAuthenticated = !!(parsed?.state?.accessToken || parsed?.accessToken);
    } catch (e) {
      isAuthenticated = false;
    }
  }

  // Redirect unauthenticated users away from protected routes
  if (!PUBLIC_ROUTES.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
