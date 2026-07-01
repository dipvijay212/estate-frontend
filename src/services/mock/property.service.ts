const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

let mockProperties: Property[] = [
  {
    id: 'PROP-001',
    title: 'Modern Luxury Villa',
    description: 'A beautiful modern villa with panoramic views.',
    price: 1250000,
    currency: 'USD',
    address: '123 Ocean View Dr',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    country: 'USA',
    type: 'house',
    status: 'available',
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4200,
    yearBuilt: 2022,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000'],
    features: ['Pool', 'Smart Home', 'Ocean View'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const propertyService = {
  async getProperties(): Promise<Property[]> {
    await delay(600);
    return [...mockProperties];
  },

  async getProperty(id: string): Promise<Property | null> {
    await delay(400);
    const property = mockProperties.find(p => p.id === id);
    return property || null;
  },

  async createProperty(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    await delay(800);
    const newProperty: Property = {
      ...data,
      id: `PROP-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProperties.push(newProperty);
    return newProperty;
  },

  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    await delay(800);
    const index = mockProperties.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Property not found');
    
    const updatedProperty = {
      ...mockProperties[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockProperties[index] = updatedProperty;
    return updatedProperty;
  },

  async deleteProperty(id: string): Promise<void> {
    await delay(600);
    const index = mockProperties.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Property not found');
    mockProperties.splice(index, 1);
  }
};
