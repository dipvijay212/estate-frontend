'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AddPropertyWizard } from '@/features/properties/components/wizard/AddPropertyWizard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { propertyService, Property } from '@/services/mock/property.service';
import { PropertyFormData } from '@/features/properties/validation/propertySchema';
import Link from 'next/link';

// @ts-expect-error - Next.js 15 params type workaround for mock data
export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const unwrappedParams = await Promise.resolve(params);
      const data = await propertyService.getProperty(unwrappedParams.id);
      if (!data) throw new Error('Property not found');
      setProperty(data);
    } catch (err) {
      setError('Failed to load property details.');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-5xl mx-auto w-full animate-pulse">
        <div className="h-12 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-[600px] bg-muted rounded w-full"></div>
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
        <p className="text-muted-foreground mb-6">The property you are trying to edit does not exist.</p>
        <Button asChild>
          <Link href="/dashboard/properties">Return to Properties</Link>
        </Button>
      </div>
    );
  }

  // Map mock property data to form data schema
  const initialData: Partial<PropertyFormData> = {
    title: property.title,
    description: property.description,
    category: property.type as PropertyFormData['category'],
    status: property.status as PropertyFormData['status'],
    state: property.state,
    city: property.city,
    area: 'Downtown', // Mock missing field
    address: property.address,
    googleMapUrl: '',
    salePrice: property.price,
    rentPrice: undefined,
    bookingAmount: undefined,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    parking: 2, // Mock missing field
    squareFeet: property.squareFeet,
    floor: 'Ground', // Mock missing field
    age: '5 Years', // Mock missing field
    facing: 'North', // Mock missing field
    amenities: property.features,
    images: property.images,
  };

  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full shrink-0">
          <Link href={`/dashboard/properties/${property.id}`}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit Property</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Updating details for <span className="font-semibold text-foreground">{property.title}</span>.
          </p>
        </div>
      </div>
      
      <div className="w-full">
        <AddPropertyWizard initialData={initialData} mode="edit" propertyId={property.id} />
      </div>
    </div>
  );
}
