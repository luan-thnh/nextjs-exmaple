import { env } from './env';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Next.js Template',
  metaTitle: 'Next.js Template - Modern UI Kit',
  description:
    'A professional Next.js template featuring modern UI components, responsive design, and best practices for building scalable web applications.',
  keywords: ['templates', 'ui', 'nextjs', 'react', 'tailwindcss', 'shadcn', 'components', 'design'],
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og-image.png`,
  socials: {
    telegram: 'https://t.me/example',
    twitter: 'https://twitter.com/example',
    linkedin: 'https://www.linkedin.com/company/example',
    facebook: 'https://www.facebook.com/example',
  },
  email: 'contact@example.com',
  organization: {
    name: 'Example Org',
    logo: `${env.NEXT_PUBLIC_APP_URL}/favicon-32x32.png`,
  },
};
