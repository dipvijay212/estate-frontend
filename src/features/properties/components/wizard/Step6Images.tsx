import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageUploader } from '@/components/ui/image-uploader';

export function Step6Images() {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const images = watch('images') || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Property Media</h3>
        <p className="text-sm text-muted-foreground">Upload high-quality images of the property. The first image will be used as the thumbnail.</p>
      </div>

      <ImageUploader 
        value={images} 
        onChange={(urls) => setValue('images', urls, { shouldValidate: true, shouldDirty: true })} 
        maxFiles={12} 
      />
      
      {errors.images && <p className="text-destructive text-sm">{errors.images.message as string}</p>}
    </div>
  );
}
