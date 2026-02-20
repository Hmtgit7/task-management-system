import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];
const PROTECTED_PREFIXES = ['/dashboard'];

function getIsAuthenticated(request: NextRequest): boolean {
  try {
    const authStorage = request.cookies.get('auth-storage');
    if (!authStorage?.value) return false;
    const decoded = decodeURIComponent(authStorage.value);
    const parsed = JSON.parse(decoded);
    const token = parsed?.state?.accessToken;
    return typeof token === 'string' && token.length > 0;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = getIsAuthenticated(request);

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  if (isProtected && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
