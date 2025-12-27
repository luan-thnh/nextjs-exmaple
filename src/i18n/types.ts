import viMessages from '../locales/vi.json';

// Extract type from messages structure
type Messages = typeof viMessages;

// Extract namespace keys
export type Namespace = keyof Messages;

// Recursive type for nested keys
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;

// Extract keys for a specific namespace
export type TranslationKey<N extends Namespace> = NestedKeyOf<Messages[N]>;

// Type-safe translation function
export type TranslationFunction<N extends Namespace> = (
  key: TranslationKey<N>,
  values?: Record<string, string | number | boolean | Date>,
) => string;
