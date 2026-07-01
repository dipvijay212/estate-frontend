'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    type: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
    status?: string;
  };
  agencyName: string;
  layout?: 'grid' | 'list';
}

export function PropertyCard({ property, agencyName, layout = 'grid' }: PropertyCardProps) {
  const isList = layout === 'list';

  const statusColor = property.status === 'For Rent' 
    ? 'bg-blue-600' 
    : property.status === 'Sold' 
      ? 'bg-red-600' 
      : 'bg-emerald-600';

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`group bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex ${isList ? 'flex-col sm:flex-row' : 'flex-col'}`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isList ? 'sm:w-2/5 h-64 sm:h-auto shrink-0' : 'h-64'}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${property.image}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        
        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-black/60 text-white backdrop-blur-md text-xs font-medium rounded-full shadow-sm border border-white/10">
              {property.type}
            </span>
            {property.status && (
              <span className={`px-3 py-1 text-white text-xs font-bold rounded-full shadow-sm ${statusColor}`}>
                {property.status}
              </span>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors shadow-sm">
          <Heart className="w-4 h-4" />
        </button>

        {/* Price overlay (only in grid view to save space, or both) */}
        {!isList && (
          <div className="absolute bottom-4 left-4">
            <p className="text-2xl font-bold text-white drop-shadow-md">{property.price}</p>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className={`flex flex-col flex-1 p-5 ${isList ? 'sm:p-6 sm:justify-between' : ''}`}>
        
        {/* Header (Title & Price for List View) */}
        <div className={`${isList ? 'flex justify-between items-start mb-4' : 'mb-2'}`}>
          <div>
            <Link href={`/${agencyName}/properties/${property.id}`} className="block">
              <h3 className={`font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors ${isList ? 'text-2xl mb-2' : 'text-lg mb-1'}`}>
                {property.title}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-primary shrink-0" /> {property.location}
            </p>
          </div>
          {isList && (
            <div className="text-right hidden sm:block shrink-0 ml-4">
              <p className="text-2xl font-bold text-primary">{property.price}</p>
            </div>
          )}
        </div>
        
        {/* Stats Row */}
        <div className={`flex items-center gap-4 text-muted-foreground text-sm ${isList ? 'mb-6' : 'mb-6'}`}>
          <div className="flex items-center gap-1.5" title="Bedrooms">
            <div className="p-1.5 rounded-md bg-muted"><Bed className="w-4 h-4 text-primary" /></div>
            <span className="font-medium text-foreground">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5" title="Bathrooms">
            <div className="p-1.5 rounded-md bg-muted"><Bath className="w-4 h-4 text-primary" /></div>
            <span className="font-medium text-foreground">{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5" title="Square Feet">
            <div className="p-1.5 rounded-md bg-muted"><Square className="w-4 h-4 text-primary" /></div>
            <span className="font-medium text-foreground">{property.sqft} SqFt</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t mt-auto">
          {isList && (
            <div className="sm:hidden">
              <p className="text-xl font-bold text-primary">{property.price}</p>
            </div>
          )}
          <Button variant={isList ? "default" : "outline"} className={`ml-auto ${isList ? 'px-6' : 'w-full'}`} asChild>
            <Link href={`/${agencyName}/properties/${property.id}`}>
              View Details {isList && <ArrowRight className="w-4 h-4 ml-2" />}
            </Link>
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
