'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function PropertySearch() {
  return (
    <div className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 container mx-auto mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="bg-background rounded-2xl shadow-xl shadow-black/5 border p-2 md:p-4 max-w-5xl mx-auto backdrop-blur-xl"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          
          <div className="flex-1 w-full flex items-center bg-muted/50 rounded-xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-background transition-colors">
            <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-0.5">Location</label>
              <input type="text" placeholder="City, Zip, or Neighborhood" className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 font-medium" />
            </div>
          </div>

          <div className="w-[2px] h-10 bg-border hidden md:block shrink-0" />

          <div className="flex-1 w-full flex items-center bg-muted/50 rounded-xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-background transition-colors">
            <Home className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-0.5">Property Type</label>
              <Select>
                <SelectTrigger className="w-full bg-transparent border-none p-0 h-auto font-medium focus:ring-0 shadow-none">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-[2px] h-10 bg-border hidden md:block shrink-0" />

          <div className="flex-1 w-full flex items-center bg-muted/50 rounded-xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-background transition-colors">
            <DollarSign className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-0.5">Budget</label>
              <Select>
                <SelectTrigger className="w-full bg-transparent border-none p-0 h-auto font-medium focus:ring-0 shadow-none">
                  <SelectValue placeholder="Any Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Budget</SelectItem>
                  <SelectItem value="0-500k">Under $500k</SelectItem>
                  <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                  <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                  <SelectItem value="5m+">$5M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button size="lg" className="w-full md:w-auto h-[60px] md:h-[68px] px-8 rounded-xl shrink-0 shadow-md">
            <Search className="w-5 h-5 mr-2" /> Search
          </Button>

        </div>
      </motion.div>
    </div>
  );
}
