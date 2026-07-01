'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginPayload } from '../validation/authSchema';
import { useAuth } from '../hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      await login(data);
    } catch {
      // Error is handled in the hook and passed via state
    }
  };

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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input 
          id="password" 
          type="password" 
          {...register('password')} 
          placeholder="••••••••" 
          className="h-12" 
          disabled={isLoading}
        />
        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input 
          type="checkbox" 
          id="rememberMe" 
          {...register('rememberMe')}
          className="rounded border-border text-primary focus:ring-primary w-4 h-4"
        />
        <label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
          Remember me for 30 days
        </label>
      </div>

      <Button type="submit" className="w-full h-12 text-base font-semibold mt-2" disabled={isLoading}>
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Start Free Trial
        </Link>
      </p>
    </form>
  );
}
