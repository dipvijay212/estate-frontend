'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Share, Edit, Trash, ChevronRight, CheckCircle2, TrendingUp, Eye, Heart, Calendar, AlertCircle } from 'lucide-react';
import { propertyService, Property } from '@/services/mock/property.service';
import { PropertyGallery } from '@/features/properties/components/PropertyGallery';
import { PropertyStatusBadge } from '@/features/properties/components/PropertyStatusBadge';
import { DeletePropertyModal } from '@/features/properties/components/DeletePropertyModal';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Square, Home, Building } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// @ts-expect-error - Next.js 15 params type workaround for mock data
export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const router = useRouter();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Unwrapping params for Next.js 15
      const unwrappedParams = await Promise.resolve(params);
      const data = await propertyService.getProperty(unwrappedParams.id);
      if (!data) throw new Error('Property not found');
      setProperty(data);
    } catch (err) {
      setError('Property not found or failed to load.');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-7xl mx-auto w-full animate-pulse">
        <div className="h-12 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-muted rounded w-1/2 mb-8"></div>
        <div className="h-96 bg-muted rounded w-full"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="bg-destructive/10 p-4 rounded-full mb-4">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
        <p className="text-muted-foreground mb-6">The property you are looking for does not exist or has been deleted.</p>
        <Button asChild>
          <Link href="/dashboard/properties">Return to Properties</Link>
        </Button>
      </div>
    );
  }

  // Mock timeline events
  const timelineEvents = [
    { title: 'Property Listed', date: 'Oct 24, 2023', description: 'Listed on the market by Agent John.' },
    { title: 'Price Updated', date: 'Nov 12, 2023', description: 'Price reduced by 5% to attract more buyers.' },
    { title: 'Viewing Scheduled', date: 'Nov 18, 2023', description: 'Viewing requested by Sarah Jenkins.' },
    { title: 'Offer Received', date: 'Nov 22, 2023', description: 'Initial offer of $1.2M received.' },
  ];

  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{property.title}</h1>
            <PropertyStatusBadge status={property.status} />
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
              {property.type}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="w-4 h-4 mr-1 shrink-0" />
            <span className="text-lg">{property.address}, {property.city}, {property.state} {property.zipCode}</span>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
             <Link href="/dashboard/properties">Back to list</Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link href={`/dashboard/properties/${property.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" /> Edit Property
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Gallery Section */}
          <section className="bg-card border rounded-2xl p-4 shadow-sm">
            <PropertyGallery images={property.images} />
          </section>

          {/* Quick Info Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Bed className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Bedrooms</p>
                <p className="text-xl font-bold">{property.bedrooms}</p>
              </div>
            </div>
            <div className="bg-card border rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Bath className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Bathrooms</p>
                <p className="text-xl font-bold">{property.bathrooms}</p>
              </div>
            </div>
            <div className="bg-card border rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Square className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Square Feet</p>
                <p className="text-xl font-bold">{property.squareFeet}</p>
              </div>
            </div>
            <div className="bg-card border rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Year Built</p>
                <p className="text-xl font-bold">{property.yearBuilt}</p>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
          </section>

          {/* Amenities Section */}
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
              {property.features.length > 0 ? (
                property.features.map(feature => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="font-medium text-foreground">{feature}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground col-span-full">No amenities listed.</p>
              )}
            </div>
          </section>

          {/* Map Placeholder Section */}
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="w-full h-[300px] bg-muted/50 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer hover:bg-muted transition-colors">
              <MapPin className="w-10 h-10 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium">Google Maps Integration</p>
              <p className="text-sm text-muted-foreground">Interactive map will be rendered here.</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="xl:col-span-1 space-y-6">
          
          {/* Price & Actions Card */}
          <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-6">
            <div className="mb-6 pb-6 border-b">
              <p className="text-sm text-muted-foreground font-medium mb-1">Asking Price</p>
              <h2 className="text-4xl font-bold text-primary">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
              </h2>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <Button className="w-full justify-start h-11" variant="default" asChild>
                <Link href={`/dashboard/properties/${property.id}/edit`}>
                  <Edit className="w-4 h-4 mr-3" /> Edit Details
                </Link>
              </Button>
              <Button className="w-full justify-start h-11" variant="outline">
                <Share className="w-4 h-4 mr-3" /> Share Property
              </Button>
              <Button 
                className="w-full justify-start h-11 text-destructive hover:text-destructive hover:bg-destructive/10" 
                variant="ghost"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="w-4 h-4 mr-3" /> Delete Listing
              </Button>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Property Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="w-4 h-4" /> Views (30 days)
                </div>
                <span className="font-bold">1,245</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-4 h-4" /> Favorites
                </div>
                <span className="font-bold">84</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-4 h-4 rounded border flex items-center justify-center font-bold text-[10px]">in</span>
                  Inquiries
                </div>
                <span className="font-bold text-primary">12 New</span>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Property Timeline</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[2px] md:ml-0 z-10" />
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-muted/50 p-4 rounded-xl border shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>

      <DeletePropertyModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        propertyTitle={property.title}
        propertyId={property.id}
        onSuccess={() => {
          // In a real app, we would redirect to the property list
          router.push('/dashboard/properties');
        }}
      />
    </div>
  );
}
