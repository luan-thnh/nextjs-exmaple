/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { API_AUTH_PREFIX, AUTH_ROUTES, PUBLIC_ROUTES, ROUTES } from '@/libs/routes';
import createMiddleware from 'next-intl/middleware';

import { auth } from '@/config/auth';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  // Replace dynamic routes with regex
  const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, '[^/]+'));

  return RegExp(
    `^(/(${routing.locales.join('|')}))?(${pathsWithParams.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  ).test(pathName);
};

const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthPage = testPathnameRegex(AUTH_ROUTES, pathname);
  const isLogged = !!req.auth;

  // New logic: if at home page, redirect based on log status
  if (pathname === '/') {
    return NextResponse.redirect(new URL(isLogged ? ROUTES.DASHBOARD : ROUTES.LOGIN, req.nextUrl));
  }

  // Redirect to login page if not authenticated
  if (!isLogged && !isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.nextUrl));
  }

  // Redirect to home page if authenticated and trying to access auth pages
  if (isLogged && isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.nextUrl));
  }

  return intlMiddleware(req);
});

export const proxy = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // Skip middleware for API auth routes (next-auth needs these)
  if (pathname.startsWith(API_AUTH_PREFIX)) {
    return NextResponse.next();
  }

  const isPublicPage = testPathnameRegex(PUBLIC_ROUTES, pathname);
  const isAuthPage = testPathnameRegex(AUTH_ROUTES, pathname);

  if (isAuthPage) {
    return (authMiddleware as any)(req);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
};

// Since the user requested proxy.ts instead of middleware.ts,
// if this is used as a middleware replacement, Next.js typically looks for middleware.ts.
// If your environment is configured to use proxy.ts for routing/auth, this replaces it.
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
