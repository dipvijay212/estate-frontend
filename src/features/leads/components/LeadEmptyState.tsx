import React from 'react';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import Link from 'next/link';

export function LeadEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border rounded-lg bg-card shadow-sm">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Target className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Leads Found</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        You don't have any leads matching your criteria. Try adjusting your filters or creating a new lead.
      </p>
      <Button asChild>
        <Link href="/dashboard/leads/new">Create Lead</Link>
      </Button>
    </div>
  );
}
