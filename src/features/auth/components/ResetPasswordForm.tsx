'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordPayload } from '../validation/authSchema';
import { useAuth } from '../hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResetPasswordForm() {
  const { resetPassword, isLoading, error } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordPayload) => {
    try {
      await resetPassword(data);
      setIsSuccess(true);
    } catch {
      // Error handled by hook
    }
  };

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, text: '', color: 'bg-muted' };
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    if (score <= 1) return { score, text: 'Weak', color: 'bg-destructive/80' };
    if (score === 2) return { score, text: 'Fair', color: 'bg-orange-500/80' };
    if (score === 3) return { score, text: 'Good', color: 'bg-yellow-500/80' };
    return { score, text: 'Strong', color: 'bg-emerald-500/80' };
  };

  const strength = getPasswordStrength(passwordValue);

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-4">Password reset successful</h3>
        <p className="text-muted-foreground mb-8">
          Your password has been successfully reset. You can now log in with your new password.
        </p>
        <Link href="/login">
          <Button className="w-full h-12 text-base font-semibold">
            Go to Login
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
        <label htmlFor="password" className="text-sm font-medium text-foreground">New Password</label>
        <Input 
          id="password" 
          type="password" 
          {...register('password', {
            onChange: (e) => setPasswordValue(e.target.value)
          })} 
          placeholder="••••••••" 
          className="h-12" 
          disabled={isLoading}
        />
        {passwordValue && (
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Password strength</span>
              <span className={cn("text-xs font-semibold", 
                strength.score <= 1 ? "text-destructive" : 
                strength.score === 2 ? "text-orange-500" : 
                strength.score === 3 ? "text-yellow-500" : "text-emerald-500"
              )}>{strength.text}</span>
            </div>
            <div className="flex gap-1 h-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-full flex-1 rounded-full transition-all duration-300",
                    i <= strength.score ? strength.color : "bg-muted"
                  )} 
                />
              ))}
            </div>
          </div>
        )}
        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm New Password</label>
        <Input 
          id="confirmPassword" 
          type="password" 
          {...register('confirmPassword')} 
          placeholder="••••••••" 
          className="h-12" 
          disabled={isLoading}
        />
        {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full h-12 text-base font-semibold mt-4" disabled={isLoading}>
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
      </Button>
    </form>
  );
}
