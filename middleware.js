import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ADMIN = ['/admin/login'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (PUBLIC_ADMIN.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }

    const token = request.cookies.get('nexora_admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'nexora-secret-key-change-in-production'
      );
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/') && !['GET'].includes(request.method)) {
    const excludedFromAuth = ['/api/auth/login', '/api/auth/logout'];
    if (!excludedFromAuth.includes(pathname)) {
      const token = request.cookies.get('nexora_admin_token')?.value;
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'nexora-secret-key-change-in-production'
        );
        await jwtVerify(token, secret);
      } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
