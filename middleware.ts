import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for path:', request.nextUrl.pathname); // Debug log
  
  // For now, let's just allow all requests
  return NextResponse.next();
  
  // Original code commented out for debugging
  /*
  const token = request.cookies.get('token');
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!token && !isLoginPage && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}; 