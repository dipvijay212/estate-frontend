'use client';

import React, { useState } from 'react';
import { Customer } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash, Eye, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { CustomerStatusBadge } from './CustomerStatusBadge';
import { DeleteCustomerModal } from './DeleteCustomerModal';

export function CustomerTable({ customers }: { customers: Customer[] }) {
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  if (customers.length === 0) {
    return null; // Let the parent render empty state
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Customer</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Preferred Area</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Property</TableHead>
            <TableHead>Last Follow-up</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="group">
              <TableCell>
                <div>
                  <Link href={`/dashboard/customers/${customer.id}`} className="font-semibold hover:text-primary transition-colors">
                    {customer.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{customer.id}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Phone className="w-3 h-3 mr-2 text-muted-foreground" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-3 h-3 mr-2 text-muted-foreground" />
                    {customer.email}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium text-primary">
                {formatCurrency(customer.budget, customer.currency)}
              </TableCell>
              <TableCell className="text-sm">
                {customer.preferredArea}
              </TableCell>
              <TableCell>
                <CustomerStatusBadge status={customer.status} />
              </TableCell>
              <TableCell>
                {customer.assignedProperty ? (
                  <Link href={`/dashboard/properties/${customer.assignedProperty.id}`} className="text-sm font-medium hover:underline line-clamp-1 max-w-[150px]">
                    {customer.assignedProperty.title}
                  </Link>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(customer.lastFollowUp)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" asChild title="View Profile">
                    <Link href={`/dashboard/customers/${customer.id}`}>
                      <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild title="Edit">
                    <Link href={`/dashboard/customers/${customer.id}/edit`}>
                      <Edit className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground" 
                    title="Delete"
                    onClick={() => setCustomerToDelete(customer)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
                {/* Fallback for mobile/touch where hover doesn't work */}
                <Button variant="ghost" size="icon" className="group-hover:hidden lg:hidden">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {customerToDelete && (
        <DeleteCustomerModal
          isOpen={!!customerToDelete}
          onClose={() => setCustomerToDelete(null)}
          customerName={customerToDelete.name}
          customerId={customerToDelete.id}
          onSuccess={() => {
            // Mock trigger refetch/optimistic UI
            console.log('Deleted customer:', customerToDelete.id);
          }}
        />
      )}
    </div>
  );
}
