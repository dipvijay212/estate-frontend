import { Metadata } from 'next';
import { DashboardOverview } from '@/features/dashboard/components/Overview/DashboardOverview';

export const metadata: Metadata = {
  title: 'Dashboard Overview | RealtyFlow',
  description: 'RealtyFlow Dashboard Overview',
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
