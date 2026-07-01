import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export function Step4Details() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Bedrooms</label>
          <Input type="number" placeholder="0" {...register('bedrooms', { valueAsNumber: true })} />
          {errors.bedrooms && <p className="text-destructive text-sm">{errors.bedrooms.message as string}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bathrooms</label>
          <Input type="number" placeholder="0" {...register('bathrooms', { valueAsNumber: true })} />
          {errors.bathrooms && <p className="text-destructive text-sm">{errors.bathrooms.message as string}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Parking Spots</label>
          <Input type="number" placeholder="0" {...register('parking', { valueAsNumber: true })} />
          {errors.parking && <p className="text-destructive text-sm">{errors.parking.message as string}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Area (Sq Ft) <span className="text-destructive">*</span></label>
          <Input type="number" placeholder="0" {...register('squareFeet', { valueAsNumber: true })} />
          {errors.squareFeet && <p className="text-destructive text-sm">{errors.squareFeet.message as string}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Floor Level</label>
          <Input placeholder="e.g. Ground, 4th" {...register('floor')} />
          {errors.floor && <p className="text-destructive text-sm">{errors.floor.message as string}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Property Age</label>
          <Input placeholder="e.g. 5 Years, New" {...register('age')} />
          {errors.age && <p className="text-destructive text-sm">{errors.age.message as string}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Facing</label>
          <Input placeholder="e.g. North, East" {...register('facing')} />
          {errors.facing && <p className="text-destructive text-sm">{errors.facing.message as string}</p>}
        </div>
      </div>
    </div>
  );
}
