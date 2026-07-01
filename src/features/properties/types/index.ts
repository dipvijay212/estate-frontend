export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'rented' | 'pending';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}
