'use client';

import { ReactNode } from 'react';
import { queryClient } from '@/libs/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

export function Providers({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>
            <Toaster position="top-center" className="text-center [&_li]:justify-center" />
            {children}
            <NextTopLoader
              color="#2f6af5"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow={false}
            />
          </NuqsAdapter>
        </QueryClientProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
