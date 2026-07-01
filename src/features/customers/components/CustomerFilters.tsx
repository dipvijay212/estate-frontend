import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function CustomerFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
      <Select defaultValue="all">
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="new">New Lead</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="viewing">Viewing</SelectItem>
          <SelectItem value="negotiating">Negotiating</SelectItem>
          <SelectItem value="closed">Closed/Won</SelectItem>
          <SelectItem value="lost">Lost</SelectItem>
        </SelectContent>
      </Select>
      
      <Select defaultValue="all">
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Budget" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Budget</SelectItem>
          <SelectItem value="low">&lt; $500k</SelectItem>
          <SelectItem value="mid">$500k - $1M</SelectItem>
          <SelectItem value="high">&gt; $1M</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" size="icon" className="bg-card shrink-0">
        <Filter className="w-4 h-4" />
      </Button>
    </div>
  );
}
