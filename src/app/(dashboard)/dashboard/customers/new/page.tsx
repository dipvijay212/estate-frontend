import React from 'react';
import { AddCustomerForm } from '@/features/customers/components/AddCustomerForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewCustomerPage() {
  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full shrink-0">
          <Link href="/dashboard/customers">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Add New Customer</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Create a new lead profile in the system.
          </p>
        </div>
      </div>
      
      <div className="w-full">
        <AddCustomerForm />
      </div>
    </div>
  );
}
