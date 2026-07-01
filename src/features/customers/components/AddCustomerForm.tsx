'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, CustomerFormData } from '../validation/customerSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';

interface AddCustomerFormProps {
  initialData?: Partial<CustomerFormData>;
  mode?: 'create' | 'edit';
}

export function AddCustomerForm({ initialData, mode = 'create' }: AddCustomerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue, watch, formState: { errors, isDirty } } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData || {
      budget: undefined,
      preferredPropertyType: 'house',
      source: 'website'
    },
    mode: 'onChange'
  });

  const preferredPropertyType = watch('preferredPropertyType');
  const source = watch('source');

  // Unsaved changes alert
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isSubmitting]);

  const onSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (mode === 'edit') {
        toast.success('Customer updated successfully!');
      } else {
        toast.success('Customer added successfully!');
      }
      
      router.push('/dashboard/customers');
    }, 1500);
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-muted/30 p-6 border-b">
        <h2 className="text-xl font-bold">{mode === 'edit' ? 'Edit Customer' : 'Customer Details'}</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {mode === 'edit' ? 'Update the customer profile information.' : 'Enter the lead information below.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">
        
        {/* Section: Personal Info */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. John Doe" {...register('name')} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
              <Input type="email" placeholder="john@example.com" {...register('email')} />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
              <Input placeholder="+1 (555) 000-0000" {...register('phone')} />
              {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        {/* Section: Property Preferences */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
            Property Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 lg:col-span-1">
              <label className="text-sm font-medium">Budget ($) <span className="text-destructive">*</span></label>
              <Input type="number" placeholder="0" {...register('budget', { valueAsNumber: true })} />
              {errors.budget && <p className="text-destructive text-sm">{errors.budget.message}</p>}
            </div>
            <div className="space-y-2 lg:col-span-1">
              <label className="text-sm font-medium">Property Type <span className="text-destructive">*</span></label>
              <Select value={preferredPropertyType} onValueChange={(val: any) => setValue('preferredPropertyType', val, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
              {errors.preferredPropertyType && <p className="text-destructive text-sm">{errors.preferredPropertyType.message}</p>}
            </div>
            <div className="space-y-2 lg:col-span-1">
              <label className="text-sm font-medium">Preferred City <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. Los Angeles" {...register('preferredCity')} />
              {errors.preferredCity && <p className="text-destructive text-sm">{errors.preferredCity.message}</p>}
            </div>
            <div className="space-y-2 lg:col-span-1">
              <label className="text-sm font-medium">Preferred Area <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. Downtown" {...register('preferredArea')} />
              {errors.preferredArea && <p className="text-destructive text-sm">{errors.preferredArea.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Specific Requirements</label>
            <Textarea 
              placeholder="e.g. Must have a pool, close to transit, ground floor only..." 
              className="min-h-[100px]" 
              {...register('requirements')} 
            />
          </div>
        </div>

        {/* Section: Additional Details */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
            Additional Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-1">
              <label className="text-sm font-medium">Lead Source <span className="text-destructive">*</span></label>
              <Select value={source} onValueChange={(val: any) => setValue('source', val, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="walk_in">Walk-in</SelectItem>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.source && <p className="text-destructive text-sm">{errors.source.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Internal Notes</label>
              <Input placeholder="Private notes for the team..." {...register('notes')} />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-8">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || (mode === 'edit' && !isDirty)} className="min-w-[150px]">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
            ) : (
              <><Check className="w-4 h-4 mr-2" /> {mode === 'edit' ? 'Update Customer' : 'Save Customer'}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
