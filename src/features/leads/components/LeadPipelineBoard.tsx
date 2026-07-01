import React, { useState } from 'react';
import { Lead } from '../types';
import { LeadPriorityBadge } from './LeadPriorityBadge';
import { Calendar, MoreHorizontal, MessageSquare, Phone, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LeadPipelineBoardProps {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: Lead['status']) => void;
}

const COLUMNS: { id: Lead['status']; label: string; colorClass: string }[] = [
  { id: 'new', label: 'New', colorClass: 'bg-blue-500' },
  { id: 'contacted', label: 'Contacted', colorClass: 'bg-purple-500' },
  { id: 'interested', label: 'Interested', colorClass: 'bg-indigo-500' },
  { id: 'site_visit', label: 'Site Visit', colorClass: 'bg-teal-500' },
  { id: 'negotiation', label: 'Negotiation', colorClass: 'bg-orange-500' },
  { id: 'booked', label: 'Booked', colorClass: 'bg-green-500' },
  { id: 'closed', label: 'Closed (Won)', colorClass: 'bg-green-700' },
  { id: 'lost', label: 'Lost', colorClass: 'bg-red-500' }
];

export function LeadPipelineBoard({ leads, onStatusChange }: LeadPipelineBoardProps) {
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Lead['status'] | null>(null);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLeadId(leadId);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox compatibility
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: Lead['status']) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, columnId: Lead['status']) => {
    e.preventDefault();
    setDragOverColumn(null);
    if (draggedLeadId) {
      onStatusChange(draggedLeadId, columnId);
    }
    setDraggedLeadId(null);
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return '$0';
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
    return `$${amount}`;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(dateString));
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-220px)] min-h-[600px] snap-x">
      {COLUMNS.map((column) => {
        const columnLeads = leads.filter(l => l.status === column.id);
        const columnValue = columnLeads.reduce((acc, curr) => acc + (curr.expectedBudget || 0), 0);
        const isDragOver = dragOverColumn === column.id;

        return (
          <div 
            key={column.id} 
            className={`flex flex-col flex-shrink-0 w-[300px] rounded-xl overflow-hidden transition-colors duration-200 border bg-muted/20 ${isDragOver ? 'border-primary/50 bg-primary/5' : 'border-border/50'}`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="p-3 bg-card border-b shadow-sm sticky top-0 z-10 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${column.colorClass}`} />
                  <h3 className="font-semibold text-sm">{column.label}</h3>
                </div>
                <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                  {columnLeads.length}
                </span>
              </div>
              <div className="text-xs font-medium text-muted-foreground">
                Est: <span className="text-foreground">{formatCurrency(columnValue)}</span>
              </div>
            </div>

            {/* Droppable Area */}
            <div className="flex-1 p-2 space-y-3 overflow-y-auto min-h-[100px]">
              {columnLeads.map(lead => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                  className={`bg-card p-3 rounded-lg border shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all ${draggedLeadId === lead.id ? 'opacity-50 scale-95' : 'opacity-100'}`}
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <Link href={`/dashboard/leads/${lead.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1">
                      {lead.customerName}
                    </Link>
                    <Button variant="ghost" size="icon" className="w-6 h-6 shrink-0 -mt-1 -mr-1 text-muted-foreground hover:text-foreground" asChild>
                       <Link href={`/dashboard/leads/${lead.id}`}><MoreHorizontal className="w-4 h-4" /></Link>
                    </Button>
                  </div>
                  
                  <div className="mb-3">
                    {lead.interestedProperty ? (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {lead.interestedProperty.title}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">
                        General Inquiry
                      </p>
                    )}
                    <p className="text-xs font-medium text-foreground mt-1 flex items-center">
                      <DollarSign className="w-3 h-3 text-green-600 mr-0.5" />
                      {lead.expectedBudget ? formatCurrency(lead.expectedBudget) : 'TBD'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t">
                    <LeadPriorityBadge priority={lead.priority} />
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-xs text-muted-foreground" title="Next Follow-up">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(lead.nextFollowUp)}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold" title={`Assigned to ${lead.assignedTo.name}`}>
                        {lead.assignedTo.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {columnLeads.length === 0 && (
                <div className="h-20 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">Drop lead here</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
