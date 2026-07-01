import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function LeadSearch() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Search leads by name, email or phone..."
        className="pl-10 bg-card"
      />
    </div>
  );
}
