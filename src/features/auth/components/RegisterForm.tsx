'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterPayload } from '../validation/authSchema';
import { useAuth } from '../hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RegisterForm() {
  const { register: registerUser, isLoading, error } = useAuth();
  const [passwordValue, setPasswordValue] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterPayload) => {
    try {
      await registerUser(data);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="businessName" className="text-sm font-medium text-foreground">Business Name</label>
        <Input id="businessName" {...register('businessName')} placeholder="Acme Real Estate" className="h-12" disabled={isLoading} />
        {errors.businessName && <p className="text-destructive text-sm mt-1">{errors.businessName.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="ownerName" className="text-sm font-medium text-foreground">Owner Name</label>
        <Input id="ownerName" {...register('ownerName')} placeholder="John Doe" className="h-12" disabled={isLoading} />
        {errors.ownerName && <p className="text-destructive text-sm mt-1">{errors.ownerName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Business Email</label>
          <Input id="email" type="email" {...register('email')} placeholder="name@agency.com" className="h-12" disabled={isLoading} />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
          <Input id="phone" type="tel" {...register('phone')} placeholder="(555) 000-0000" className="h-12" disabled={isLoading} />
          {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
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
        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</label>
        <Input id="confirmPassword" type="password" {...register('confirmPassword')} placeholder="••••••••" className="h-12" disabled={isLoading} />
        {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex items-start gap-2 pt-2">
        <input 
          type="checkbox" 
          id="acceptTerms" 
          {...register('acceptTerms')}
          className="rounded border-border text-primary focus:ring-primary w-4 h-4 mt-1 shrink-0"
          disabled={isLoading}
        />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="acceptTerms" className="text-sm font-medium text-foreground cursor-pointer">
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
          {errors.acceptTerms && <p className="text-destructive text-sm mt-0.5">{errors.acceptTerms.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full h-12 text-base font-semibold mt-4" disabled={isLoading}>
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Free Account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Already have account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
