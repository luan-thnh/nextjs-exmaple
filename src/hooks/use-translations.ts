import { Namespace, TranslationKey } from '@/i18n/types';
import { useTranslations as useNextIntlTranslations } from 'next-intl';

/**
 * Type-safe wrapper for next-intl's useTranslations hook
 * Provides autocomplete for namespace and translation keys
 *
 * @example
 * ```typescript
 * const t = useTranslations('common');
 * t('login') // ✅ Type-safe, autocomplete works
 * ```
 */
export function useTranslations<N extends Namespace>(namespace: N) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useNextIntlTranslations(namespace as any);

  return t as (
    key: TranslationKey<N>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values?: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formats?: any,
  ) => string;
}
