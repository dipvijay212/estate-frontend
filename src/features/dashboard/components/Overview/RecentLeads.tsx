import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { LeadSummary } from '@/services/mock/dashboard.service';

interface RecentLeadsProps {
  leads: LeadSummary[];
}

export function RecentLeads({ leads }: RecentLeadsProps) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Contacted': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Qualified': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Leads</h3>
        <Button variant="link" className="text-primary h-auto p-0">View All</Button>
      </div>
      
      <div className="space-y-4 flex-1">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>No recent leads found.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.source} • {lead.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
                <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Mail size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Phone size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
