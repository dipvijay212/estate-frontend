import { Metadata } from 'next';
import { AuthLayoutUI } from '@/features/auth/components/AuthLayoutUI';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Choose New Password | RealtyFlow',
  description: 'Set a new password for your RealtyFlow account.',
};

export default function ResetPasswordPage() {
  return (
    <AuthLayoutUI 
      title="Set new password" 
      subtitle="Your new password must be different from previously used passwords."
    >
      <ResetPasswordForm />
    </AuthLayoutUI>
  );
}
