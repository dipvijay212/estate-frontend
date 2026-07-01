import { Metadata } from 'next';
import { AuthLayoutUI } from '@/features/auth/components/AuthLayoutUI';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | RealtyFlow',
  description: 'Log in to your RealtyFlow account to manage your real estate portfolio.',
};

export default function LoginPage() {
  return (
    <AuthLayoutUI 
      title="Welcome back" 
      subtitle="Enter your details to access your dashboard."
    >
      <LoginForm />
    </AuthLayoutUI>
  );
}
