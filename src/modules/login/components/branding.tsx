import { Lock } from 'lucide-react';

import { useTranslations } from '@/hooks/use-translations';

export const LoginBranding = () => {
  const t = useTranslations('login');

  return (
    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-zinc-900 p-10 text-white lg:flex">
      <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-blue-600/20 to-emerald-600/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />

      <div className="relative z-10 flex items-center gap-2 text-lg font-medium">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
          <Lock className="h-4 w-4" />
        </div>
        CNTT Admin
      </div>

      <div className="relative z-10 max-w-lg space-y-4">
        <div className="h-1 w-12 rounded bg-white/20" />
        <blockquote className="text-xl leading-relaxed font-medium">
          &ldquo;{t('testimonialQuote')}&rdquo;
        </blockquote>
        <div className="flex items-center gap-4 pt-4">
          <div className="h-10 w-10 rounded-full bg-white/20" />
          <div className="text-sm">
            <div className="font-semibold">{t('testimonialAuthor')}</div>
            <div className="text-white/60">{t('testimonialRole')}</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-xs text-white/40">{t('copyright')}</div>
    </div>
  );
};
