import { type MetadataRoute } from 'next';

import { env } from '@/config/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/login'].map((route) => ({
    url: `${env.NEXT_PUBLIC_APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
