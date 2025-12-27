'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/libs/routes';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import { LocaleSwitcher } from '@/components/ui/locale-switcher';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '../ui/sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50">
        <Sidebar className="border-r border-slate-200 bg-white">
          <SidebarHeader className="border-b border-slate-100 p-4">
            <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 px-2">
              <div className="bg-primary-600 shadow-primary-200 flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-md">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm leading-none font-bold text-slate-900">CNTT Admin</span>
                <span className="text-[10px] font-medium text-slate-500 uppercase">Enterprise</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="gap-1 p-3">
            <div className="mb-2 px-2 text-xs font-semibold text-slate-400 uppercase">Overview</div>
            <Link href={ROUTES.DASHBOARD}>
              <Button
                variant={pathname === ROUTES.DASHBOARD ? 'secondary' : 'ghost'}
                className={`w-full justify-start font-medium ${
                  pathname === ROUTES.DASHBOARD
                    ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            {/* Add more links here later */}
          </SidebarContent>
          <SidebarFooter className="border-t border-slate-100 bg-slate-50/50 p-4">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <Avatar className="border-primary-100 h-9 w-9 border">
                <AvatarFallback className="bg-primary-50 text-primary-700 font-semibold">
                  {session?.user?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {session?.user?.name || 'Admin User'}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {session?.user?.email || 'admin@example.com'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut()}
                className="h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-500"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex min-h-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="hidden flex-col md:flex">
                <h2 className="text-lg font-semibold text-slate-800">Overview</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Home</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-primary-600 font-medium">Dashboard</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <svg
                  className="absolute top-2.5 left-2.5 h-4 w-4 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="focus:border-primary-500 focus:ring-primary-500 h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pr-4 pl-9 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:ring-1 focus:outline-none"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </Button>
              <LocaleSwitcher />
            </div>
          </header>

          <div className="flex-1 overflow-auto p-6 md:p-8">
            <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto space-y-8 duration-500">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
