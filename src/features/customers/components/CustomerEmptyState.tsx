import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import Link from 'next/link';

export function CustomerEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border rounded-lg bg-card shadow-sm">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Users className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Customers Found</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        We couldn't find any customers matching your criteria. Try adjusting your filters or adding a new customer lead.
      </p>
      <Button asChild>
        <Link href="/dashboard/customers/new">Add Customer</Link>
      </Button>
    </div>
  );
}
