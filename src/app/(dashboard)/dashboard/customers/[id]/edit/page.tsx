import React from 'react';
import { AddCustomerForm } from '@/features/customers/components/AddCustomerForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { mockCustomers } from '@/features/customers/constants/mockData';
import { CustomerFormData } from '@/features/customers/validation/customerSchema';

// @ts-expect-error - Next.js 15 params type workaround for mock data
export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const customer = mockCustomers.find(c => c.id === params.id) || mockCustomers[0];

  // Map mock customer data to form data schema
  const initialData: Partial<CustomerFormData> = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    budget: customer.budget,
    preferredPropertyType: 'house', // Mocking missing field
    preferredCity: 'Los Angeles', // Mocking missing field
    preferredArea: customer.preferredArea,
    requirements: 'Looking for a 3+ bedroom property.\nMust have a private garden.\nClose proximity to top-tier international schools.',
    source: 'website', // Mocking missing field
    notes: 'Highly motivated buyer. They are relocating due to work in 3 months and are eager to finalize something soon.'
  };

  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full shrink-0">
          <Link href={`/dashboard/customers/${customer.id}`}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit Customer</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Updating profile details for <span className="font-semibold text-foreground">{customer.name}</span>.
          </p>
        </div>
      </div>
      
      <div className="w-full">
        <AddCustomerForm initialData={initialData} mode="edit" />
      </div>
    </div>
  );
}
