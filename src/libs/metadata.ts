import type { Metadata } from 'next';

import { env } from '@/config/env';
import { siteConfig } from '@/config/site';

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
  keywords?: string[];
};

export const buildMetadata = ({
  title,
  description,
  path = '/',
  image,
  noIndex,
  keywords,
}: BuildMetadataOptions = {}): Metadata => {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.metaTitle;
  const pageDescription = description ?? siteConfig.description;
  const canonicalUrl = new URL(path, env.NEXT_PUBLIC_APP_URL).toString();
  const ogImage = image ?? siteConfig.ogImage;

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: keywords ?? siteConfig.keywords,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: ogImage ? [ogImage] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
};

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.organization.name,
  url: env.NEXT_PUBLIC_APP_URL,
  logo: siteConfig.organization.logo,
  sameAs: Object.values(siteConfig.socials),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: siteConfig.email,
      contactType: 'customer support',
      availableLanguage: ['en', 'vi'],
    },
  ],
});
