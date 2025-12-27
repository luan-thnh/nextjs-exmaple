import { buildMetadata } from '@/libs/metadata';
import Login from '@/modules/login';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.login' });

  return buildMetadata({
    title: t('title'),
    description: t('description'),
  });
}

export default function LoginPage() {
  return <Login />;
}
