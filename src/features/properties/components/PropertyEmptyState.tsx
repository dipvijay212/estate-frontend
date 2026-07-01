import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PropertyEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card">
      <div className="rounded-full bg-muted p-4 mb-4">
        <svg className="w-8 h-8 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">We couldn't find any properties matching your criteria. Try adjusting your filters or adding a new property.</p>
      <Button asChild>
        <Link href="/dashboard/properties/new">Add Property</Link>
      </Button>
    </div>
  );
}
