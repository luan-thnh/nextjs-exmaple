/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

if (process.env.SKIP_ENV_IMPORT !== 'true') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./src/config/env');
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

const webpack = (config: any) => {
  // Grab the existing rule that handles SVG imports
  const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

  config.module.rules.push(
    // Reapply the existing rule, but only for svg imports ending in ?url
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/, // *.svg?url
    },
    // Convert all other *.svg imports to React components
    {
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
      use: ['@svgr/webpack'],
    },
  );

  // Modify the file loader rule to ignore *.svg, since we have it handled now.
  fileLoaderRule.exclude = /\.svg$/i;

  return config;
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Better logging for server actions and data fetching
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  output: 'standalone',
  turbopack: {
    // For development
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },

  webpack,
  // React Compiler for automatic memoization (Needs react 19+)
  reactCompiler: true,

  // Type-safe routing
  typedRoutes: true,

  // Expert Level Optimizations
  experimental: {
    // Partial Prerendering (PPR) - Optimized for mixed static/dynamic pages
    // ppr: 'incremental',

    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns',
      'lodash',
      'clsx',
      'tailwind-merge',
    ],
  } as any,
};

// Initialize the Next-Intl plugin
let configWithPlugins = createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);

// Conditionally enable bundle analysis
if (process.env.ANALYZE === 'true') {
  configWithPlugins = withBundleAnalyzer();
}

export default configWithPlugins;
