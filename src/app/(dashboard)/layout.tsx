import { AuthGuard } from '@/components/Guards/AuthGuard';
import { DashboardLayoutClient } from '@/features/dashboard/components/Layout/DashboardLayoutClient';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayoutClient>
        {children}
      </DashboardLayoutClient>
    </AuthGuard>
  );
}
