import React from 'react';
import { FilterState } from '../hooks/usePropertyFilters';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface AdvancedPropertyFiltersProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  className?: string;
  onClose?: () => void;
}

export function AdvancedPropertyFilters({ filters, updateFilter, resetFilters, className = '', onClose }: AdvancedPropertyFiltersProps) {
  return (
    <div className={`flex flex-col space-y-6 ${className}`}>
      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <Input 
          placeholder="Property name, ID..." 
          value={filters.search} 
          onChange={(e) => updateFilter('search', e.target.value)} 
        />
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Sort By</label>
        <Select value={filters.sortBy} onValueChange={(val) => updateFilter('sortBy', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest_price">Highest Price</SelectItem>
            <SelectItem value="lowest_price">Lowest Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-px bg-border my-2"></div>

      {/* Filters */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg tracking-tight">Filters</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium">Property Type</label>
          <Select value={filters.type} onValueChange={(val) => updateFilter('type', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Type</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={filters.status} onValueChange={(val) => updateFilter('status', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Any Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location (City)</label>
          <Input 
            placeholder="e.g. New York" 
            value={filters.city} 
            onChange={(e) => updateFilter('city', e.target.value)} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="flex items-center gap-2">
            <Input 
              type="number" 
              placeholder="Min" 
              value={filters.minPrice} 
              onChange={(e) => updateFilter('minPrice', e.target.value)} 
            />
            <span className="text-muted-foreground">-</span>
            <Input 
              type="number" 
              placeholder="Max" 
              value={filters.maxPrice} 
              onChange={(e) => updateFilter('maxPrice', e.target.value)} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms</label>
            <Select value={filters.bedrooms} onValueChange={(val) => updateFilter('bedrooms', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4+">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bathrooms</label>
            <Select value={filters.bathrooms} onValueChange={(val) => updateFilter('bathrooms', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4+">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Min Area (SqFt)</label>
          <Input 
            type="number" 
            placeholder="e.g. 1000" 
            value={filters.area} 
            onChange={(e) => updateFilter('area', e.target.value)} 
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset
        </Button>
        {onClose && (
          <Button className="w-full" onClick={onClose}>
            Apply Filters
          </Button>
        )}
      </div>
    </div>
  );
}
