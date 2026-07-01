import React, { useState } from 'react';
import { Lead } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash, Eye, Phone, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadPriorityBadge } from './LeadPriorityBadge';
import { DeleteLeadModal } from './DeleteLeadModal';

export function LeadTable({ leads }: { leads: Lead[] }) {
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  if (leads.length === 0) {
    return null; // Let the parent render empty state
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const formatSource = (source: string) => {
    return source.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Customer</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Interested In</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Next Follow-up</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="group">
              <TableCell>
                <div>
                  <Link href={`/dashboard/leads/${lead.id}`} className="font-semibold hover:text-primary transition-colors">
                    {lead.customerName}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{lead.id}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Phone className="w-3 h-3 mr-2 text-muted-foreground" />
                    {lead.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-3 h-3 mr-2 text-muted-foreground" />
                    <span className="truncate max-w-[120px]" title={lead.email}>{lead.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {lead.interestedProperty ? (
                  <Link href={`/dashboard/properties/${lead.interestedProperty.id}`} className="text-sm font-medium hover:underline line-clamp-2 max-w-[150px]">
                    {lead.interestedProperty.title}
                  </Link>
                ) : (
                  <span className="text-muted-foreground text-sm italic">General Inquiry</span>
                )}
              </TableCell>
              <TableCell className="text-sm">
                {formatSource(lead.source)}
              </TableCell>
              <TableCell>
                <LeadStatusBadge status={lead.status} />
              </TableCell>
              <TableCell>
                <LeadPriorityBadge priority={lead.priority} />
              </TableCell>
              <TableCell className="text-sm font-medium">
                {formatDate(lead.nextFollowUp)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                    {lead.assignedTo.name.charAt(0)}
                  </div>
                  <span className="text-sm truncate">{lead.assignedTo.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" asChild title="View Lead">
                    <Link href={`/dashboard/leads/${lead.id}`}>
                      <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild title="Edit Lead">
                    <Link href={`/dashboard/leads/${lead.id}/edit`}>
                      <Edit className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-destructive/10 hover:text-destructive text-muted-foreground" 
                    title="Delete"
                    onClick={() => setLeadToDelete(lead)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
                {/* Fallback for mobile/touch */}
                <Button variant="ghost" size="icon" className="group-hover:hidden xl:hidden">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {leadToDelete && (
        <DeleteLeadModal
          isOpen={!!leadToDelete}
          onClose={() => setLeadToDelete(null)}
          leadName={leadToDelete.customerName}
          leadId={leadToDelete.id}
          onSuccess={() => {
            // Mock trigger refetch/optimistic UI
            console.log('Deleted lead:', leadToDelete.id);
          }}
        />
      )}
    </div>
  );
}
