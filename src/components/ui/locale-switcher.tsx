'use client';

import { useRouter as useNextRouter } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const LocaleSwitcher = () => {
  const router = useRouter(); // next-intl router for locale handling
  const nextRouter = useNextRouter(); // standard router for refresh
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (nextLocale: string) => {
    // Cast pathname to any to bypass typedRoutes strict check for dynamic paths
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: nextLocale });
    nextRouter.refresh();
  };

  return (
    <Select defaultValue={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-20" aria-label="lang-switcher">
        <SelectValue placeholder="Loc" />
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((elt) => (
          <SelectItem key={elt} value={elt}>
            {elt.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
