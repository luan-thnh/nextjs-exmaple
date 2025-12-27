export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  POSTS: '/dashboard/posts',
} as const;

export const PUBLIC_ROUTES: string[] = [ROUTES.LOGIN];
export const AUTH_ROUTES: string[] = [ROUTES.LOGIN];
export const API_AUTH_PREFIX = '/api/auth';
export const DEFAULT_LOGIN_REDIRECT: string = ROUTES.DASHBOARD;
