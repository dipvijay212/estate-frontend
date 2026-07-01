import { GuestGuard } from '@/components/Guards/GuestGuard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      {children}
    </GuestGuard>
  );
}
