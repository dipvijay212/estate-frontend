'use client';

import React, { useState } from 'react';
import { mockLeads } from '@/features/leads/constants/mockData';
import { LeadStatusBadge } from '@/features/leads/components/LeadStatusBadge';
import { LeadPriorityBadge } from '@/features/leads/components/LeadPriorityBadge';
import { DeleteLeadModal } from '@/features/leads/components/DeleteLeadModal';
import { LeadNotes } from '@/features/leads/components/LeadNotes';
import { Button } from '@/components/ui/button';
import { 
  Phone, Mail, MessageCircle, Edit, Trash, Calendar, 
  DollarSign, Home, UserCheck, CheckCircle2, Navigation,
  MessageSquare, FileSignature, MapPin
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LeadDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const lead = mockLeads.find(p => p.id === params.id) || mockLeads[0];
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(dateString));
  };

  // Hardcoded visual timeline sequence matching user request
  const timelineSequence = [
    { title: 'Lead Created', date: 'Oct 10, 2023 - 09:00 AM', completed: true, icon: UserCheck },
    { title: 'Customer Called', date: 'Oct 11, 2023 - 10:30 AM', completed: true, icon: Phone },
    { title: 'WhatsApp Sent', date: 'Oct 11, 2023 - 11:15 AM', completed: true, icon: MessageCircle },
    { title: 'Site Visit Scheduled', date: 'Oct 15, 2023 - 02:00 PM', completed: true, icon: MapPin },
    { title: 'Negotiation', date: 'Pending', completed: false, icon: MessageSquare },
    { title: 'Booked', date: 'Pending', completed: false, icon: FileSignature }
  ];

  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{lead.customerName}</h1>
          </div>
          <div className="flex items-center text-muted-foreground mt-1 text-sm">
            <span className="font-medium mr-4 uppercase text-xs tracking-wider">Lead ID: {lead.id}</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Acquired {formatDate(lead.createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
             <Link href="/dashboard/leads">Back to list</Link>
          </Button>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href={`/dashboard/leads/${lead.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" /> Edit Lead
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Customer Info & Timeline */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Customer Info Card */}
          <section className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-muted/30 p-5 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" /> Lead Information
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Phone Number</p>
                  <p className="flex items-center font-medium"><Phone className="w-4 h-4 mr-2 text-muted-foreground" /> {lead.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email Address</p>
                  <p className="flex items-center font-medium"><Mail className="w-4 h-4 mr-2 text-muted-foreground" /> {lead.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Interested Property</p>
                  {lead.interestedProperty ? (
                    <Link href={`/dashboard/properties/${lead.interestedProperty.id}`} className="flex items-center font-medium text-primary hover:underline">
                      <Home className="w-4 h-4 mr-2" /> {lead.interestedProperty.title}
                    </Link>
                  ) : (
                    <span className="flex items-center font-medium text-muted-foreground"><Navigation className="w-4 h-4 mr-2" /> General Inquiry</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Expected Budget</p>
                  <p className="flex items-center font-bold text-lg"><DollarSign className="w-5 h-5 text-green-600" /> {lead.expectedBudget ? formatCurrency(lead.expectedBudget) : 'TBD'}</p>
                </div>
              </div>

            </div>
          </section>

          {/* Vertical Pipeline Timeline */}
          <section className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-muted/30 p-5 border-b">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" /> Pipeline Journey
              </h3>
            </div>
            <div className="p-6 sm:p-8">
              <div className="relative border-l-2 border-muted ml-4 md:ml-6 space-y-8">
                {timelineSequence.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="relative pl-8">
                      <div className={`absolute -left-[13px] top-1 rounded-full border-4 border-background flex items-center justify-center w-6 h-6
                        ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {step.completed ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${step.completed ? 'text-primary' : 'text-muted-foreground'}`} />
                          <h4 className={`text-lg font-semibold ${!step.completed && 'text-muted-foreground'}`}>{step.title}</h4>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground mt-1 sm:mt-0">{step.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Lead Notes */}
          <LeadNotes />
        </div>

        {/* Right Column: Sidebar */}
        <aside className="xl:col-span-1 space-y-6">
          
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden sticky top-6">
            
            {/* Status & Assignment Box */}
            <div className="p-6 space-y-6">
              
              <div className="flex justify-between items-center border-b pb-4">
                <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                <LeadStatusBadge status={lead.status} />
              </div>
              
              <div className="flex justify-between items-center border-b pb-4">
                <p className="text-sm font-medium text-muted-foreground">Lead Priority</p>
                <LeadPriorityBadge priority={lead.priority} />
              </div>

              <div className="border-b pb-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Assigned Agent</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {lead.assignedTo.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{lead.assignedTo.name}</p>
                    <p className="text-xs text-muted-foreground">Sales Executive</p>
                  </div>
                </div>
              </div>

              <div className="pb-2">
                <p className="text-sm font-medium text-muted-foreground mb-1">Next Follow-up Date</p>
                <p className="font-bold flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" /> {formatDate(lead.nextFollowUp)}
                </p>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-muted/10 border-t space-y-3">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              
              <Button className="w-full justify-start h-11 bg-green-600 hover:bg-green-700 text-white" asChild>
                <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                  <MessageCircle className="w-4 h-4 mr-3" /> Send WhatsApp
                </a>
              </Button>
              
              <Button className="w-full justify-start h-11" variant="outline" asChild>
                <a href={`tel:${lead.phone}`}>
                  <Phone className="w-4 h-4 mr-3" /> Call Lead
                </a>
              </Button>
              
              <div className="pt-4 mt-4 border-t space-y-3">
                <Button className="w-full justify-start h-11" variant="ghost" asChild>
                  <Link href={`/dashboard/leads/${lead.id}/edit`}>
                    <Edit className="w-4 h-4 mr-3" /> Edit Details
                  </Link>
                </Button>
                <Button 
                  className="w-full justify-start h-11 text-destructive hover:text-destructive hover:bg-destructive/10" 
                  variant="ghost"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash className="w-4 h-4 mr-3" /> Delete Lead
                </Button>
              </div>
            </div>

          </div>
        </aside>
      </div>

      <DeleteLeadModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        leadName={lead.customerName}
        leadId={lead.id}
        onSuccess={() => {
          router.push('/dashboard/leads');
        }}
      />
    </div>
  );
}
