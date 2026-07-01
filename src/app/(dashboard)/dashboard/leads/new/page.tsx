import React from 'react';
import { AddLeadWizard } from '@/features/leads/components/AddLeadWizard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewLeadPage() {
  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full shrink-0">
          <Link href="/dashboard/leads">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Add New Lead</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Create a new lead pipeline entry by completing the wizard below.
          </p>
        </div>
      </div>
      
      <div className="w-full">
        <AddLeadWizard />
      </div>
    </div>
  );
}
