import React from 'react';
import { FilterState } from '../hooks/usePropertyFilters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ActiveFilterChipsProps {
  activeChips: { key: keyof FilterState; label: string }[];
  removeChip: (key: keyof FilterState) => void;
  resetFilters: () => void;
}

export function ActiveFilterChips({ activeChips, removeChip, resetFilters }: ActiveFilterChipsProps) {
  if (activeChips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-sm text-muted-foreground mr-1">Active Filters:</span>
      {activeChips.map((chip) => (
        <Badge key={chip.key} variant="secondary" className="px-3 py-1 flex items-center gap-1.5 font-normal">
          {chip.label}
          <button 
            onClick={() => removeChip(chip.key)}
            className="hover:bg-muted-foreground/20 rounded-full p-0.5 transition-colors focus:outline-none"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={resetFilters} 
        className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground"
      >
        Clear All
      </Button>
    </div>
  );
}
