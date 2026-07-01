import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

const AMENITIES_LIST = [
  'Lift',
  'Gym',
  'Garden',
  'Pool',
  'Security',
  'Power Backup',
  'Club House',
  'Parking',
  'Water Supply',
  'WIFI'
];

export function Step5Amenities() {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const selectedAmenities = watch('amenities') || [];

  const toggleAmenity = (amenity: string, checked: boolean) => {
    if (checked) {
      setValue('amenities', [...selectedAmenities, amenity], { shouldValidate: true, shouldDirty: true });
    } else {
      setValue('amenities', selectedAmenities.filter((a: string) => a !== amenity), { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-lg font-medium">Select Amenities</h3>
      <p className="text-sm text-muted-foreground mb-4">Choose the amenities available in this property.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {AMENITIES_LIST.map(amenity => (
          <div key={amenity} className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => toggleAmenity(amenity, !selectedAmenities.includes(amenity))}>
            <Checkbox 
              checked={selectedAmenities.includes(amenity)}
              onCheckedChange={(checked) => toggleAmenity(amenity, checked as boolean)}
            />
            <div className="space-y-1 leading-none">
              <label className="text-sm font-medium cursor-pointer">
                {amenity}
              </label>
            </div>
          </div>
        ))}
      </div>
      {errors.amenities && <p className="text-destructive text-sm">{errors.amenities.message as string}</p>}
    </div>
  );
}
