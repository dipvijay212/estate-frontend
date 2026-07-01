'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { checkSession, isAuthenticated, isLoading } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      checkSession();
    }
  }, [checkSession]);

  // Don't render until we know the auth state to prevent layout shift / flash of unauthenticated content
  if (isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
