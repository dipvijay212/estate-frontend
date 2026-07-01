import { Metadata } from 'next';
import { AuthLayoutUI } from '@/features/auth/components/AuthLayoutUI';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | RealtyFlow',
  description: 'Reset your RealtyFlow account password.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayoutUI 
      title="Reset your password" 
      subtitle="Enter your email and we'll send you a link to reset your password."
      showBackButton
    >
      <ForgotPasswordForm />
    </AuthLayoutUI>
  );
}
