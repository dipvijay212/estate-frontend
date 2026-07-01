import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Check, MapPin, DollarSign, Home, Building } from 'lucide-react';
import { PropertyImage } from '../PropertyImage';
import { PropertyStatusBadge } from '../PropertyStatusBadge';

export function Step7Preview() {
  const { getValues } = useFormContext();
  const data = getValues();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-muted/30 border rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Check className="w-5 h-5 text-primary" /> Property Preview
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images preview */}
          <div className="lg:col-span-1 space-y-4">
            {data.images && data.images.length > 0 ? (
              <div className="rounded-lg overflow-hidden shadow-sm aspect-[4/3]">
                <PropertyImage src={data.images[0]} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="rounded-lg bg-muted flex items-center justify-center aspect-[4/3] border border-dashed">
                <span className="text-muted-foreground">No Images Uploaded</span>
              </div>
            )}
            {data.images && data.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {data.images.slice(1, 4).map((img: string, idx: number) => (
                  <div key={idx} className="rounded aspect-square overflow-hidden border">
                    <img src={img} alt={`Gal ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details preview */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{data.title || 'Untitled Property'}</h2>
                <PropertyStatusBadge status={data.status || 'available'} />
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                  {data.category || 'Category'}
                </span>
              </div>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 mr-1 shrink-0" />
                <span>{data.address}, {data.area}, {data.city}, {data.state}</span>
              </div>
            </div>

            <div className="flex gap-6 border-y py-4">
              {data.salePrice && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sale Price</p>
                  <p className="font-semibold text-xl text-primary">${data.salePrice.toLocaleString()}</p>
                </div>
              )}
              {data.rentPrice && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rent Price</p>
                  <p className="font-semibold text-xl text-primary">${data.rentPrice.toLocaleString()}/mo</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-background border rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Bedrooms</p>
                <p className="font-semibold">{data.bedrooms || '-'}</p>
              </div>
              <div className="bg-background border rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Bathrooms</p>
                <p className="font-semibold">{data.bathrooms || '-'}</p>
              </div>
              <div className="bg-background border rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Area</p>
                <p className="font-semibold">{data.squareFeet ? `${data.squareFeet} SqFt` : '-'}</p>
              </div>
              <div className="bg-background border rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Parking</p>
                <p className="font-semibold">{data.parking || '-'}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {data.description || 'No description provided.'}
              </p>
            </div>

            {data.amenities && data.amenities.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {data.amenities.map((amenity: string) => (
                    <span key={amenity} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
