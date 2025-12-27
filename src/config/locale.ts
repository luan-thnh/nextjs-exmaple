import { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

export const localeConfig = {
  name: 'Nextjs Template',
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix,
};
