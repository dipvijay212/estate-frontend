import React from 'react';

export function PropertyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`bg-muted overflow-hidden flex-shrink-0 ${className || ''}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          No Image
        </div>
      )}
    </div>
  );
}
