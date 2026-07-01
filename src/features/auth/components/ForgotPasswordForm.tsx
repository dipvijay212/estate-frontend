'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordPayload } from '../validation/authSchema';
import { useAuth } from '../hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function ForgotPasswordForm() {
  const { forgotPassword, isLoading, error } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordPayload) => {
    try {
      await forgotPassword(data);
      setIsSuccess(true);
    } catch {
      // Error handled by hook
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-4">Check your email</h3>
        <p className="text-muted-foreground mb-8">
          We&apos;ve sent a password reset link to your email address. Please check your inbox and spam folder.
        </p>
        <Link href="/reset-password">
          <Button variant="outline" className="w-full">
            (Demo) Go to Reset Password
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">Email address</label>
        <Input 
          id="email" 
          type="email" 
          {...register('email')} 
          placeholder="name@agency.com" 
          className="h-12" 
          disabled={isLoading}
        />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full h-12 text-base font-semibold mt-4" disabled={isLoading}>
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
      </Button>
    </form>
  );
}
