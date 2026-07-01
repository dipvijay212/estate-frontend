'use client';

import React from 'react';
import { getPropertyDetails, websiteMockData } from '@/features/website/constants/mockData';
import { PropertyCard } from '@/features/website/components/PropertyCard';
import { motion } from 'framer-motion';
import { 
  MapPin, Bed, Bath, Square, CheckCircle2, Phone, 
  MessageCircle, Calendar, Share2, Heart, ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AgencyPropertyDetailsClient({ params }: { params: { agency: string, id: string } }) {
  const property = getPropertyDetails(params.id);
  
  // Use a slice of allProperties for "Related Properties"
  const relatedProperties = websiteMockData.allProperties
    .filter(p => p.id !== property.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-muted/20 pb-24 pt-24">
      
      {/* 1. Large Image Gallery */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-sm">
          
          <div className="lg:col-span-3 h-full relative group cursor-pointer overflow-hidden">
            <img 
              src={property.gallery[0]} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-md">
                {property.status}
              </span>
              <span className="px-4 py-1.5 bg-black/50 text-white backdrop-blur-md text-sm font-medium rounded-full shadow-md">
                {property.type}
              </span>
            </div>
          </div>
          
          <div className="hidden lg:grid grid-rows-2 gap-4 h-full">
            <div className="relative group cursor-pointer overflow-hidden rounded-xl">
              <img src={property.gallery[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery 1" loading="lazy" decoding="async" />
            </div>
            <div className="relative group cursor-pointer overflow-hidden rounded-xl">
              <img src={property.gallery[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Gallery 2" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/20 transition-colors">
                <span className="text-white font-semibold text-lg drop-shadow-md">View All Photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Header & Price */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{property.title}</h1>
                  <p className="text-muted-foreground text-lg flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary shrink-0" /> {property.location}
                  </p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <p className="text-4xl font-extrabold text-primary">{property.price}</p>
                  <p className="text-sm text-muted-foreground mt-1">Est. Mortgage: $9,200/mo</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t">
                <Button variant="outline" className="rounded-full">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
                <Button variant="outline" className="rounded-full">
                  <Heart className="w-4 h-4 mr-2" /> Save
                </Button>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Bed className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{property.beds}</p>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
              </div>
              <div className="bg-card p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Bath className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{property.baths}</p>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
              </div>
              <div className="bg-card p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Square className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{property.sqft}</p>
                <p className="text-sm text-muted-foreground">Square Feet</p>
              </div>
              <div className="bg-card p-4 rounded-xl border flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">Verified</p>
                <p className="text-sm text-muted-foreground">Listing</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Property Description</h3>
              <div className="prose prose-zinc max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
                {property.description}
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {Object.entries(property.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Location</h3>
              <p className="text-muted-foreground mb-4 flex items-center"><MapPin className="w-4 h-4 mr-2" /> {property.location}</p>
              <div className="w-full h-[400px] bg-muted rounded-xl flex items-center justify-center border shadow-inner overflow-hidden relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }} />
                <div className="text-center z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-semibold text-muted-foreground">Interactive Map Integration</p>
                  <p className="text-xs text-muted-foreground">Google Maps / Mapbox</p>
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-card rounded-2xl shadow-sm border p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">What's Nearby</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.nearby.map((place, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-xl border bg-muted/20">
                    <div>
                      <p className="font-semibold text-foreground">{place.name}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{place.type}</p>
                    </div>
                    <span className="text-sm font-medium bg-background px-3 py-1 rounded-md shadow-sm border">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Agent Contact Card */}
              <div className="bg-card rounded-2xl shadow-xl shadow-black/5 border p-6">
                <h3 className="font-bold text-lg mb-6">Contact Agent</h3>
                
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={property.agent.avatar} 
                    alt={property.agent.name} 
                    className="w-16 h-16 rounded-full border-2 border-primary/20 object-cover"
                    loading="lazy" 
                    decoding="async"
                  />
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{property.agent.name}</h4>
                    <p className="text-sm text-muted-foreground">{property.agent.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{property.agent.license}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <Button className="w-full h-12 rounded-xl text-md" variant="default">
                    <Phone className="w-5 h-5 mr-2" /> {property.agent.phone}
                  </Button>
                  <Button className="w-full h-12 rounded-xl text-md bg-[#25D366] hover:bg-[#128C7E] text-white">
                    <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                  </Button>
                </div>

                {/* Inquiry Form */}
                <form className="space-y-4 pt-6 border-t" onSubmit={(e) => e.preventDefault()}>
                  <h4 className="font-semibold text-foreground mb-4">Request a Tour</h4>
                  <Input placeholder="Your Name" className="h-12 bg-muted/50" />
                  <Input placeholder="Phone Number" className="h-12 bg-muted/50" />
                  <Input placeholder="Email Address" className="h-12 bg-muted/50" />
                  <Textarea placeholder="I'm interested in this property..." className="min-h-[100px] bg-muted/50" />
                  <Button type="submit" className="w-full h-12 rounded-xl text-md">
                    <Calendar className="w-5 h-5 mr-2" /> Schedule Visit
                  </Button>
                </form>

              </div>

            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-24 border-t pt-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">Similar Properties</h2>
          <p className="text-muted-foreground mb-8">You might also be interested in these listings.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} agencyName={params.agency} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
