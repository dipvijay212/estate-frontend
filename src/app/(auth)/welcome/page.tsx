import { Metadata } from 'next';
import { WelcomeUI } from '@/features/auth/components/WelcomeUI';

export const metadata: Metadata = {
  title: 'Welcome to RealtyFlow',
  description: 'Your account has been successfully created.',
};

export default function WelcomePage() {
  return <WelcomeUI />;
}
