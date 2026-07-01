import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function Step1Basic() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const category = watch('category');
  const status = watch('status');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <label className="text-sm font-medium">Property Title <span className="text-destructive">*</span></label>
        <Input placeholder="e.g. Luxury Villa in Beverly Hills" {...register('title')} />
        {errors.title && <p className="text-destructive text-sm">{errors.title.message as string}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description <span className="text-destructive">*</span></label>
        <Textarea placeholder="Describe the property in detail..." className="min-h-[120px]" {...register('description')} />
        {errors.description && <p className="text-destructive text-sm">{errors.description.message as string}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category <span className="text-destructive">*</span></label>
          <Select value={category} onValueChange={(val) => setValue('category', val, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-destructive text-sm">{errors.category.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status <span className="text-destructive">*</span></label>
          <Select value={status} onValueChange={(val) => setValue('status', val, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-destructive text-sm">{errors.status.message as string}</p>}
        </div>
      </div>
    </div>
  );
}
