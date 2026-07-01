'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { websiteMockData } from '@/features/website/constants/mockData';
import { PropertyCard } from '@/features/website/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutGrid, List, SlidersHorizontal, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { EmptyState } from '@/features/website/components/EmptyState';

export default function AgencyPropertiesClient({ params }: { params: { agency: string } }) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data setup
  const allProperties = websiteMockData.allProperties;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allProperties.length / itemsPerPage);
  
  // Simple pagination logic for mock data
  const paginatedProperties = allProperties.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-muted/20 pb-24 pt-28">
      {/* Page Header */}
      <div className="bg-primary/5 py-12 border-b mb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Property Search
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our extensive collection of premium properties. Use the filters below to find exactly what you're looking for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Filter Bar */}
        <div className="bg-card rounded-2xl shadow-sm border p-4 mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between sticky top-24 z-30">
          
          {/* Mobile Filter Toggle */}
          <div className="flex w-full lg:hidden justify-between items-center">
            <Button variant="outline" onClick={() => setShowMobileFilters(!showMobileFilters)}>
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
            </Button>
            <div className="flex bg-muted p-1 rounded-lg">
              <button 
                onClick={() => setView('grid')} 
                className={`p-2 rounded-md transition-colors ${view === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setView('list')} 
                className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop Filters (and Mobile Collapsible) */}
          <div className={`w-full lg:flex items-center gap-4 ${showMobileFilters ? 'flex flex-col' : 'hidden'}`}>
            
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search location, zip..." className="pl-10 h-10 w-full bg-muted/50 border-transparent focus-visible:ring-primary/20" />
            </div>

            <div className="grid grid-cols-2 lg:flex gap-3 w-full lg:w-auto">
              <Select>
                <SelectTrigger className="h-10 bg-muted/50 border-transparent">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-10 bg-muted/50 border-transparent">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-500k">Under $500k</SelectItem>
                  <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                  <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-10 bg-muted/50 border-transparent">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Beds</SelectItem>
                  <SelectItem value="1">1+ Beds</SelectItem>
                  <SelectItem value="2">2+ Beds</SelectItem>
                  <SelectItem value="3">3+ Beds</SelectItem>
                  <SelectItem value="4">4+ Beds</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-10 bg-muted/50 border-transparent">
                  <SelectValue placeholder="Bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Baths</SelectItem>
                  <SelectItem value="1">1+ Baths</SelectItem>
                  <SelectItem value="2">2+ Baths</SelectItem>
                  <SelectItem value="3">3+ Baths</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full lg:w-auto h-10 lg:ml-auto shrink-0 shadow-sm">
              Apply Filters
            </Button>

          </div>

          {/* Desktop Right Side: Sort & View Toggle */}
          <div className="hidden lg:flex items-center gap-4 shrink-0 border-l pl-4">
            <Select defaultValue="newest">
              <SelectTrigger className="h-10 w-[160px] bg-transparent border-input">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex bg-muted p-1 rounded-lg border">
              <button 
                onClick={() => setView('grid')} 
                className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="Grid View"
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('list')} 
                className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="List View"
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground font-medium">
            Showing <strong className="text-foreground">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, allProperties.length)}</strong> of <strong className="text-foreground">{allProperties.length}</strong> properties
          </p>
        </div>

        {/* Properties Grid/List or Empty State */}
        {paginatedProperties.length === 0 ? (
          <EmptyState 
            onAction={() => {
              // Reset filters logic would go here
              console.log('Reset filters');
            }} 
          />
        ) : (
          <motion.div 
            layout
            className={
              view === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "flex flex-col gap-6"
            }
          >
            <AnimatePresence mode="popLayout">
              {paginatedProperties.map((property) => (
                <motion.div 
                  key={property.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCard 
                    property={property} 
                    agencyName={params.agency} 
                    layout={view} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-full w-10 h-10"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold ${currentPage !== i + 1 && 'border-transparent bg-muted hover:bg-muted/80'}`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full w-10 h-10"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
