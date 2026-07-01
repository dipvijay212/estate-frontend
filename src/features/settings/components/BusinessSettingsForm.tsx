'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessSettingsSchema, BusinessSettingsFormData } from '../validation/businessSettingsSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Check, Save } from 'lucide-react';

export function BusinessSettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock initial data fetching
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<BusinessSettingsFormData>({
    resolver: zodResolver(businessSettingsSchema),
    defaultValues: {
      businessName: 'RealtyFlow Properties',
      ownerName: 'Admin User',
      phone: '+1 (555) 123-4567',
      email: 'contact@realtyflow.com',
      address: '123 Real Estate Blvd, Suite 100',
      city: 'Los Angeles',
      state: 'CA',
      pincode: '90001',
      businessDescription: 'Premium real estate agency specializing in luxury properties and commercial leasing across the metropolitan area.',
      gstNumber: 'GSTIN123456789',
      reraNumber: 'RERA-CA-987654321',
      businessHours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM',
    },
    mode: 'onChange'
  });

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

  const onSubmit = async (data: BusinessSettingsFormData) => {
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      reset(data); // Reset form to clear isDirty state with new data
      toast.success('Business settings saved successfully!');
    }, 1500);
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border overflow-hidden animate-in fade-in duration-500">
      <div className="bg-muted/30 p-6 border-b">
        <h2 className="text-xl font-bold">Business Information</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your company's core details, address, and legal identifiers.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">
        
        {/* Section: Basic Info */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. RealtyFlow Properties" {...register('businessName')} />
              {errors.businessName && <p className="text-destructive text-sm">{errors.businessName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Owner Name <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. John Doe" {...register('ownerName')} />
              {errors.ownerName && <p className="text-destructive text-sm">{errors.ownerName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
              <Input placeholder="+1 (555) 000-0000" {...register('phone')} />
              {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
              <Input type="email" placeholder="contact@example.com" {...register('email')} />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Business Description <span className="text-destructive">*</span></label>
              <Textarea 
                placeholder="Briefly describe your business services..." 
                className="min-h-[100px]" 
                {...register('businessDescription')} 
              />
              {errors.businessDescription && <p className="text-destructive text-sm">{errors.businessDescription.message}</p>}
            </div>
          </div>
        </div>

        {/* Section: Location */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
            Location Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <label className="text-sm font-medium">Street Address <span className="text-destructive">*</span></label>
              <Input placeholder="123 Main St, Suite 100" {...register('address')} />
              {errors.address && <p className="text-destructive text-sm">{errors.address.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. Los Angeles" {...register('city')} />
              {errors.city && <p className="text-destructive text-sm">{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State/Province <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. CA" {...register('state')} />
              {errors.state && <p className="text-destructive text-sm">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pincode/Zip Code <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. 90001" {...register('pincode')} />
              {errors.pincode && <p className="text-destructive text-sm">{errors.pincode.message}</p>}
            </div>
          </div>
        </div>

        {/* Section: Compliance & Operations */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
            Compliance & Operations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">GST Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
              <Input placeholder="Enter GST Number" {...register('gstNumber')} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">RERA Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
              <Input placeholder="Enter RERA Registration Number" {...register('reraNumber')} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Business Hours <span className="text-destructive">*</span></label>
              <Input placeholder="e.g. Mon-Fri: 9:00 AM - 6:00 PM" {...register('businessHours')} />
              {errors.businessHours && <p className="text-destructive text-sm">{errors.businessHours.message}</p>}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-6 border-t mt-8">
          <Button type="submit" disabled={isSubmitting || !isDirty} className="min-w-[150px]">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
            ) : (
              <><Save className="w-4 h-4 mr-2" /> Save Changes</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
