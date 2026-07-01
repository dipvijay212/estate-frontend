import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function PropertySearch() {
  return (
    <div className="relative w-full transition-all group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      </div>
      <Input 
        placeholder="Search by property name, location or ID..." 
        className="pl-10 h-10 w-full bg-background border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-sm" 
      />
    </div>
  );
}
