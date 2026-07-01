'use client';

import React, { useState } from 'react';
import { mockLeads } from '@/features/leads/constants/mockData';
import { Lead } from '@/features/leads/types';
import { LeadTable } from '@/features/leads/components/LeadTable';
import { LeadPipelineBoard } from '@/features/leads/components/LeadPipelineBoard';
import { LeadSearch } from '@/features/leads/components/LeadSearch';
import { LeadFilters } from '@/features/leads/components/LeadFilters';
import { LeadEmptyState } from '@/features/leads/components/LeadEmptyState';
import { Button } from '@/components/ui/button';
import { Plus, List, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function LeadsPage() {
  const [view, setView] = useState<'list' | 'board'>('board');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const hasData = leads.length > 0;

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  return (
    <div className={`flex flex-col space-y-6 p-4 sm:p-8 w-full ${view === 'list' ? 'max-w-[1600px] mx-auto' : ''}`}>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Leads Pipeline</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage, track, and prioritize your incoming prospects.
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* View Toggle */}
          <div className="flex items-center bg-muted p-1 rounded-full shrink-0">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full px-4 ${view === 'board' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
              onClick={() => setView('board')}
            >
              <LayoutGrid className="w-4 h-4 mr-2" /> Board
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full px-4 ${view === 'list' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
              onClick={() => setView('list')}
            >
              <List className="w-4 h-4 mr-2" /> List
            </Button>
          </div>

          <Button asChild className="shrink-0 shadow-sm rounded-full px-6 ml-2 w-full sm:w-auto">
            <Link href="/dashboard/leads/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Link>
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <LeadSearch />
        <LeadFilters />
      </div>

      {/* Main Content Area */}
      {hasData ? (
        <div className="space-y-4">
          
          {view === 'list' ? (
            <LeadTable leads={leads} />
          ) : (
            <LeadPipelineBoard leads={leads} onStatusChange={handleStatusChange} />
          )}
          
          {view === 'list' && (
            <div className="flex items-center justify-between border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{leads.length}</span> of <span className="font-medium">{leads.length}</span> leads
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
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      ) : (
        <LeadEmptyState />
      )}
    </div>
  );
}
