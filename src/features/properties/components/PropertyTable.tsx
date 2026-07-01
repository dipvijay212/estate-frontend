import React from 'react';
import { Property } from '../types';
import { PropertyStatusBadge } from './PropertyStatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash, Eye } from 'lucide-react';
import { PropertyImage } from './PropertyImage';
import { DeletePropertyModal } from './DeletePropertyModal';
import Link from 'next/link';

export function PropertyTable({ properties }: { properties: Property[] }) {
  const [propertyToDelete, setPropertyToDelete] = React.useState<Property | null>(null);

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-card">
        <div className="rounded-full bg-muted p-4 mb-4">
          <svg className="w-8 h-8 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">No properties found</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">No properties match your current search criteria. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[80px]">Thumbnail</TableHead>
            <TableHead>Property Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id} className="group hover:bg-muted/50 transition-colors">
              <TableCell>
                <PropertyImage src={property.images[0]} alt={property.title} className="w-12 h-12 rounded-md object-cover" />
              </TableCell>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell className="text-muted-foreground">{property.city}, {property.state}</TableCell>
              <TableCell className="capitalize text-muted-foreground">{property.type}</TableCell>
              <TableCell className="font-medium">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
              </TableCell>
              <TableCell>
                <PropertyStatusBadge status={property.status} />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {new Date(property.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" asChild title="View">
                    <Link href={`/dashboard/properties/${property.id}`}>
                      <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild title="Edit">
                    <Link href={`/dashboard/properties/${property.id}/edit`}>
                      <Edit className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-destructive/10" 
                    title="Delete"
                    onClick={() => setPropertyToDelete(property)}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                {/* Fallback for mobile / touch devices where hover isn't ideal */}
                <div className="flex justify-end lg:hidden">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {propertyToDelete && (
        <DeletePropertyModal
          isOpen={!!propertyToDelete}
          onClose={() => setPropertyToDelete(null)}
          propertyTitle={propertyToDelete.title}
          propertyId={propertyToDelete.id}
          onSuccess={() => {
            // In a real app, this would trigger a refetch or optimistic update
            console.log('Property soft deleted:', propertyToDelete.id);
          }}
        />
      )}
    </div>
  );
}
