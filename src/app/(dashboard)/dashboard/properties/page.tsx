'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PropertyTable } from '@/features/properties/components/PropertyTable';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { PropertyLoadingSkeleton } from '@/features/properties/components/PropertyLoadingSkeleton';
import { AdvancedPropertyFilters } from '@/features/properties/components/AdvancedPropertyFilters';
import { ActiveFilterChips } from '@/features/properties/components/ActiveFilterChips';
import { usePropertyFilters } from '@/features/properties/hooks/usePropertyFilters';
import { propertyService, Property } from '@/services/mock/property.service';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid, List, Table as TableIcon, Filter, X } from 'lucide-react';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ViewMode = 'table' | 'grid' | 'list';

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getProperties();
      setProperties(data);
    } catch (error) {
      console.error('Failed to fetch properties', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);
  
  const { filters, updateFilter, resetFilters, filteredProperties, activeChips, removeChip } = usePropertyFilters(properties);

  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 w-full max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Properties</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isLoading ? 'Loading properties...' : `Showing ${filteredProperties.length} of ${properties.length} properties.`}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Mobile Filter Toggle */}
          <Button 
            variant="outline" 
            className="lg:hidden w-full sm:w-auto"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters {activeChips.length > 0 && `(${activeChips.length})`}
          </Button>

          <Button asChild className="shrink-0 shadow-sm rounded-full px-6 w-full sm:w-auto">
            <Link href="/dashboard/properties/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-6 sticky top-6">
          <div className="bg-card border rounded-xl p-5 shadow-sm">
            <AdvancedPropertyFilters 
              filters={filters} 
              updateFilter={updateFilter} 
              resetFilters={resetFilters} 
            />
          </div>
        </aside>

        {/* Mobile Filter Drawer Overlay */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsMobileFiltersOpen(false)} 
            />
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-background p-6 shadow-xl overflow-y-auto animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <AdvancedPropertyFilters 
                filters={filters} 
                updateFilter={updateFilter} 
                resetFilters={resetFilters} 
                onClose={() => setIsMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 w-full min-w-0 flex flex-col space-y-4">
          
          {/* Toolbar (View toggle & Active Chips) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/20 p-2 rounded-xl border">
            <div className="flex-1 min-w-0">
              <ActiveFilterChips 
                activeChips={activeChips} 
                removeChip={removeChip} 
                resetFilters={resetFilters} 
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center bg-background rounded-md border p-1 shadow-sm shrink-0 ml-auto">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded ${viewMode === 'table' ? 'bg-muted shadow-sm' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded ${viewMode === 'grid' ? 'bg-muted shadow-sm' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded ${viewMode === 'list' ? 'bg-muted shadow-sm' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Data Section */}
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[400px]">
            {isLoading ? (
              <PropertyLoadingSkeleton />
            ) : (
              <>
                {viewMode === 'table' && (
                  <PropertyTable properties={filteredProperties} />
                )}
            
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} view="grid" />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-muted-foreground border rounded-xl bg-card">
                    No properties match your filters.
                  </div>
                )}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="flex flex-col gap-4">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} view="list" />
                  ))
                ) : (
                  <div className="py-12 text-center text-muted-foreground border rounded-xl bg-card">
                    No properties match your filters.
                  </div>
                )}
              </div>
            )}
              </>
            )}
          </div>

          {/* Pagination Section */}
          {filteredProperties.length > 0 && (
            <div className="mt-6 flex justify-end">
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
