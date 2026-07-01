import React from 'react';
import { PropertyImage } from './PropertyImage';

export function PropertyGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PropertyImage src={images[0]} alt="Main Property Image" className="h-[400px] md:h-[500px] rounded-lg" />
      <div className="grid grid-cols-2 gap-4">
        {images.slice(1, 5).map((image, idx) => (
          <PropertyImage key={idx} src={image} alt={`Property Image ${idx + 1}`} className="h-[190px] md:h-[240px] rounded-lg" />
        ))}
      </div>
    </div>
  );
}
