import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterX } from 'lucide-react';

export function PropertyFilter() {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-3 items-center w-full">
      <Select defaultValue="all">
        <SelectTrigger className="w-full md:w-[150px] h-10 bg-background shadow-sm border-muted-foreground/20">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="house">House</SelectItem>
          <SelectItem value="apartment">Apartment</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="land">Land</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-full md:w-[150px] h-10 bg-background shadow-sm border-muted-foreground/20">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="sold">Sold</SelectItem>
          <SelectItem value="rented">Rented</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="ghost" size="sm" className="h-10 px-3 text-muted-foreground hover:text-foreground shrink-0">
        <FilterX className="w-4 h-4 mr-2" />
        Clear
      </Button>
    </div>
  );
}
