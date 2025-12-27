import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Knip automatically enables the Next.js plugin when it detects 'next' in package.json
  // This automatically handles entry points like app/**/page.tsx, next.config.ts, etc.

  // Ignore specific files
  ignore: ['**/*.d.ts'],

  // Ignore dependencies that are known to be used but might not be detected by static analysis
  ignoreDependencies: [
    'sharp', // Used by Next.js Image optimization
  ],

  // If you use other tools that need specific entry points, add them here
  // entry: ['script/my-script.ts'],
};

export default config;
