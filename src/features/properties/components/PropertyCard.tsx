import React from 'react';
import { Property } from '../types';
import { PropertyStatusBadge } from './PropertyStatusBadge';
import { PropertyImage } from './PropertyImage';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Square, MoreHorizontal, Edit, Eye, Heart } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface PropertyCardProps {
  property: Property;
  view?: 'grid' | 'list';
}

export function PropertyCard({ property, view = 'grid' }: PropertyCardProps) {
  const isList = view === 'list';

  return (
    <div className={`group relative bg-card text-card-foreground rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex ${isList ? 'flex-col sm:flex-row' : 'flex-col'}`}>
      
      {/* Image Section */}
      <div className={`relative overflow-hidden ${isList ? 'w-full sm:w-[300px] shrink-0' : 'w-full'}`}>
        <PropertyImage 
          src={property.images[0]} 
          alt={property.title} 
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isList ? 'h-48 sm:h-full' : 'h-56'}`} 
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <PropertyStatusBadge status={property.status} />
          <span className="px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground capitalize shadow-sm">
            {property.type}
          </span>
        </div>

        {/* Favorite Button (Quick Action) */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-background/50 hover:bg-background/90 backdrop-blur-sm text-muted-foreground hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 sm:opacity-100">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className={`flex flex-col flex-1 p-5 ${isList ? 'justify-between' : 'gap-4'}`}>
        
        <div className="space-y-2">
          {/* Price & Actions Row */}
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-2xl text-primary">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/properties/${property.id}`} className="cursor-pointer">
                    <Eye className="w-4 h-4 mr-2" /> View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/properties/${property.id}/edit`} className="cursor-pointer">
                    <Edit className="w-4 h-4 mr-2" /> Edit Property
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Title & Location */}
          <div>
            <h4 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              <Link href={`/dashboard/properties/${property.id}`} className="focus:outline-none">
                {/* Expand click area */}
                <span className="absolute inset-0 z-0" aria-hidden="true" />
                {property.title}
              </Link>
            </h4>
            <div className="flex items-center text-muted-foreground mt-1 text-sm">
              <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
              <span className="line-clamp-1">{property.address}, {property.city}</span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className={`grid grid-cols-3 gap-2 py-3 border-y border-border/50 ${isList ? 'my-4' : 'mt-auto'}`}>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <div className="p-1.5 rounded bg-muted">
              <Bed className="w-3.5 h-3.5 text-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">{property.bedrooms}</span>
              <span className="text-[10px] uppercase tracking-wider">Beds</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <div className="p-1.5 rounded bg-muted">
              <Bath className="w-3.5 h-3.5 text-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">{property.bathrooms}</span>
              <span className="text-[10px] uppercase tracking-wider">Baths</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <div className="p-1.5 rounded bg-muted">
              <Square className="w-3.5 h-3.5 text-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">{property.squareFeet}</span>
              <span className="text-[10px] uppercase tracking-wider">SqFt</span>
            </div>
          </div>
        </div>

        {/* Footer (Quick Actions) */}
        {isList && (
          <div className="flex gap-2 relative z-10 mt-auto pt-2">
            <Button variant="default" size="sm" className="w-full" asChild>
               <Link href={`/dashboard/properties/${property.id}`}>View Details</Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full" asChild>
               <Link href={`/dashboard/properties/${property.id}/edit`}>Edit</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
