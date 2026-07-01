import { z } from 'zod';

export const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['house', 'apartment', 'commercial', 'land'], { required_error: 'Please select a category' }),
  status: z.enum(['available', 'sold', 'rented', 'pending'], { required_error: 'Please select a status' }),
  
  state: z.string().min(2, 'State is required'),
  city: z.string().min(2, 'City is required'),
  area: z.string().min(2, 'Area is required'),
  address: z.string().min(10, 'Full address is required'),
  googleMapUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  
  salePrice: z.number().min(0).optional(),
  rentPrice: z.number().min(0).optional(),
  bookingAmount: z.number().min(0).optional(),
  
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  parking: z.number().min(0).optional(),
  squareFeet: z.number().min(1, 'Area in sq ft is required'),
  floor: z.string().optional(),
  age: z.string().optional(),
  facing: z.string().optional(),
  
  amenities: z.array(z.string()).default([]),
  
  images: z.array(z.string()).default([]),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export const stepFields: (keyof PropertyFormData)[][] = [
  ['title', 'description', 'category', 'status'],
  ['state', 'city', 'area', 'address', 'googleMapUrl'],
  ['salePrice', 'rentPrice', 'bookingAmount'],
  ['bedrooms', 'bathrooms', 'parking', 'squareFeet', 'floor', 'age', 'facing'],
  ['amenities'],
  ['images'],
  [] // Preview step doesn't validate fields on next
];
