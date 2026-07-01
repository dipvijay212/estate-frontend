import React from 'react';
import { mockCustomers } from '@/features/customers/constants/mockData';
import { CustomerTable } from '@/features/customers/components/CustomerTable';
import { CustomerSearch } from '@/features/customers/components/CustomerSearch';
import { CustomerFilters } from '@/features/customers/components/CustomerFilters';
import { CustomerEmptyState } from '@/features/customers/components/CustomerEmptyState';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function CustomersPage() {
  const hasData = mockCustomers.length > 0;

  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your client leads, contacts, and active buyers.
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button asChild className="shrink-0 shadow-sm rounded-full px-6 w-full sm:w-auto">
            <Link href="/dashboard/customers/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Link>
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <CustomerSearch />
        <CustomerFilters />
      </div>

      {/* Main Content Area */}
      {hasData ? (
        <div className="space-y-4">
          <CustomerTable customers={mockCustomers} />
          
          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{mockCustomers.length}</span> of <span className="font-medium">{mockCustomers.length}</span> customers
            </p>
            <Pagination className="w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      ) : (
        <CustomerEmptyState />
      )}
    </div>
  );
}
