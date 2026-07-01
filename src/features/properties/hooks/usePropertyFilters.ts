import { useState, useMemo } from 'react';
import { Property } from '../types';

export interface FilterState {
  search: string;
  city: string;
  area: string;
  type: string;
  status: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  sortBy: string;
}

const initialState: FilterState = {
  search: '',
  city: '',
  area: '',
  type: 'all',
  status: 'all',
  minPrice: '',
  maxPrice: '',
  bedrooms: 'any',
  bathrooms: 'any',
  sortBy: 'newest'
};

export function usePropertyFilters(properties: Property[]) {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(initialState);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.address.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }
    if (filters.city) {
      result = result.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.area) {
      result = result.filter(p => p.squareFeet >= parseInt(filters.area || '0'));
    }
    if (filters.type && filters.type !== 'all') {
      result = result.filter(p => p.type === filters.type);
    }
    if (filters.status && filters.status !== 'all') {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseInt(filters.maxPrice));
    }
    if (filters.bedrooms && filters.bedrooms !== 'any') {
      const beds = parseInt(filters.bedrooms);
      result = result.filter(p => filters.bedrooms.includes('+') ? p.bedrooms >= beds : p.bedrooms === beds);
    }
    if (filters.bathrooms && filters.bathrooms !== 'any') {
      const baths = parseInt(filters.bathrooms);
      result = result.filter(p => filters.bathrooms.includes('+') ? p.bathrooms >= baths : p.bathrooms === baths);
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest_price':
          return b.price - a.price;
        case 'lowest_price':
          return a.price - b.price;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [properties, filters]);

  const activeChips = useMemo(() => {
    const chips: { key: keyof FilterState; label: string }[] = [];
    if (filters.search) chips.push({ key: 'search', label: `Search: ${filters.search}` });
    if (filters.city) chips.push({ key: 'city', label: `City: ${filters.city}` });
    if (filters.area) chips.push({ key: 'area', label: `Min Area: ${filters.area} sqft` });
    if (filters.type !== 'all') chips.push({ key: 'type', label: `Type: ${filters.type}` });
    if (filters.status !== 'all') chips.push({ key: 'status', label: `Status: ${filters.status}` });
    if (filters.minPrice || filters.maxPrice) {
      chips.push({ key: 'minPrice', label: `Price: $${filters.minPrice || '0'} - $${filters.maxPrice || 'Any'}` });
    }
    if (filters.bedrooms !== 'any') chips.push({ key: 'bedrooms', label: `Beds: ${filters.bedrooms}` });
    if (filters.bathrooms !== 'any') chips.push({ key: 'bathrooms', label: `Baths: ${filters.bathrooms}` });
    return chips;
  }, [filters]);

  const removeChip = (key: keyof FilterState) => {
    if (key === 'minPrice' || key === 'maxPrice') {
      setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
    } else {
      setFilters(prev => ({ ...prev, [key]: initialState[key] }));
    }
  };

  return { filters, updateFilter, resetFilters, filteredProperties, activeChips, removeChip };
}
