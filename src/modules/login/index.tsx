'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/libs/routes';
import { useSession } from 'next-auth/react';

import { LoginBranding } from './components/branding';
import { LoginForm } from './components/form';

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(ROUTES.DASHBOARD);
    }
  }, [status, router]);

  return (
    <div className="flex min-h-screen w-full">
      <LoginBranding />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
