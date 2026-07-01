import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export function Step3Pricing() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Sale Price ($)</label>
          <Input type="number" placeholder="0" {...register('salePrice', { valueAsNumber: true })} />
          {errors.salePrice && <p className="text-destructive text-sm">{errors.salePrice.message as string}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Rent Price ($ / mo)</label>
          <Input type="number" placeholder="0" {...register('rentPrice', { valueAsNumber: true })} />
          {errors.rentPrice && <p className="text-destructive text-sm">{errors.rentPrice.message as string}</p>}
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <label className="text-sm font-medium">Booking Amount ($)</label>
        <Input type="number" placeholder="0" {...register('bookingAmount', { valueAsNumber: true })} />
        {errors.bookingAmount && <p className="text-destructive text-sm">{errors.bookingAmount.message as string}</p>}
      </div>
      
      <div className="bg-muted p-4 rounded-lg mt-6">
        <p className="text-sm text-muted-foreground flex items-start gap-2">
          <span className="font-bold shrink-0">Note:</span> You can leave either Sale Price or Rent Price empty depending on the property type.
        </p>
      </div>
    </div>
  );
}
