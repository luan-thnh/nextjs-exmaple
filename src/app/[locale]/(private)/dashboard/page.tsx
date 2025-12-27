import { buildMetadata } from '@/libs/metadata';
import Dashboard from '@/modules/dashboard';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.dashboard' });

  return buildMetadata({
    title: t('title'),
    description: t('description'),
  });
}

export default function DashboardPage() {
  return <Dashboard />;
}
