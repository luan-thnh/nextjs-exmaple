'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/libs/routes';
import { loginSchema, LoginValues } from '@/libs/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github } from 'lucide-react';
import { motion } from 'motion/react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { useTranslations } from '@/hooks/use-translations';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/fields/text-field';
import { Form } from '@/components/ui/form';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';

export const LoginForm = () => {
  const router = useRouter();
  const t = useTranslations('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password',
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        setError(t('invalidCredentials'));
      } else {
        router.push(ROUTES.DASHBOARD);
        router.refresh();
      }
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-gray-50 px-4 lg:w-1/2">
      <div className="absolute top-4 right-4 z-10">
        <LocaleSwitcher />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-100 space-y-6"
      >
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{t('welcome')}</h1>
          <p className="text-sm text-gray-500">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full" disabled>
            <Github className="mr-2 h-4 w-4" />
            {t('github')}
          </Button>
          <Button variant="outline" className="w-full" disabled>
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            {t('google')}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-50 px-2 text-gray-500">{t('orContinue')}</span>
          </div>
        </div>

        <Form form={form} onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <TextField
              control={form.control}
              name="email"
              label={t('email')}
              placeholder={t('accountPlaceholder', { defaultValue: 'admin@example.com' })}
              className="bg-white"
            />
            <div className="relative">
              <TextField
                control={form.control}
                name="password"
                label={t('password')}
                type="password"
                placeholder="••••••••"
                isPassword
                className="bg-white"
              />
              <button
                type="button"
                className="text-primary absolute top-0 right-0 text-xs font-medium hover:underline"
                onClick={() => {}}
              >
                {t('forgotPassword')}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-md border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-500"
            >
              {error}
            </motion.div>
          )}

          <Button type="submit" className="h-10 w-full text-base" loading={loading}>
            {loading ? t('signingIn') : t('signIn')}
          </Button>

          <p className="text-center text-sm text-gray-500">
            {' '}
            <span className="cursor-pointer font-medium text-gray-900 hover:underline">
              admin@example.com
            </span>{' '}
            /{' '}
            <span className="cursor-pointer font-medium text-gray-900 hover:underline">
              password
            </span>
          </p>
        </Form>

        <p className="px-8 text-center text-sm text-gray-500">
          {t('termsPrefix')}{' '}
          <a href="#" className="hover:text-primary underline underline-offset-4">
            {t('terms')}
          </a>{' '}
          {t('and')}{' '}
          <a href="#" className="hover:text-primary underline underline-offset-4">
            {t('privacy')}
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
};
