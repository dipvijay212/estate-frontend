import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export function Step2Location() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">State <span className="text-destructive">*</span></label>
          <Input placeholder="e.g. California" {...register('state')} />
          {errors.state && <p className="text-destructive text-sm">{errors.state.message as string}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">City <span className="text-destructive">*</span></label>
          <Input placeholder="e.g. Los Angeles" {...register('city')} />
          {errors.city && <p className="text-destructive text-sm">{errors.city.message as string}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Area <span className="text-destructive">*</span></label>
        <Input placeholder="e.g. Downtown" {...register('area')} />
        {errors.area && <p className="text-destructive text-sm">{errors.area.message as string}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Full Address <span className="text-destructive">*</span></label>
        <Input placeholder="123 Main St, Apt 4B" {...register('address')} />
        {errors.address && <p className="text-destructive text-sm">{errors.address.message as string}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Google Map URL (Optional)</label>
        <Input placeholder="https://maps.google.com/..." {...register('googleMapUrl')} />
        {errors.googleMapUrl && <p className="text-destructive text-sm">{errors.googleMapUrl.message as string}</p>}
      </div>
    </div>
  );
}
