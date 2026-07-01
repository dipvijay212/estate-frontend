import { Metadata } from 'next';
import { AuthLayoutUI } from '@/features/auth/components/AuthLayoutUI';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Start Free Trial | RealtyFlow',
  description: 'Create your RealtyFlow account and start your 14-day free trial today.',
};

export default function RegisterPage() {
  return (
    <AuthLayoutUI 
      title="Create your account" 
      subtitle="Start your 14-day free trial. No credit card required."
    >
      <RegisterForm />
    </AuthLayoutUI>
  );
}
