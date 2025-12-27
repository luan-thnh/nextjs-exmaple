import { redirect } from 'next/navigation';
import { ROUTES } from '@/libs/routes';

export default function RootPage() {
  redirect(ROUTES.DASHBOARD);
}
