import { defineRouting } from 'next-intl/routing';

import { localeConfig } from '@/config/locale';

export const routing = defineRouting({
  locales: localeConfig.locales,
  defaultLocale: localeConfig.defaultLocale,
  localePrefix: localeConfig.localePrefix,
});
