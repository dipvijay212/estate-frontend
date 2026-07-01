'use client';

import React, { useState } from 'react';
import { mockCustomers } from '@/features/customers/constants/mockData';
import { CustomerStatusBadge } from '@/features/customers/components/CustomerStatusBadge';
import { DeleteCustomerModal } from '@/features/customers/components/DeleteCustomerModal';
import { Button } from '@/components/ui/button';
import { 
  Phone, Mail, MessageCircle, Edit, Trash, Calendar, 
  MapPin, DollarSign, Home, Clock, History, FileText, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const customer = mockCustomers.find(p => p.id === params.id) || mockCustomers[0];
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Formatting utils
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
  };

  // Mock extended data
  const interestedProperties = [
    { id: 'PROP-101', title: 'Luxury Villa in Beverly Hills', price: 1250000, status: 'available' },
    { id: 'PROP-102', title: 'Downtown LA Penthouse', price: 950000, status: 'pending' }
  ];

  const recentActivity = [
    { type: 'call', title: 'Outbound Call', date: 'Today, 10:30 AM', desc: 'Discussed budget constraints. Client is willing to go up to $1.3M for the right property.' },
    { type: 'viewing', title: 'Property Viewing', date: 'Nov 20, 2023', desc: 'Viewed the Downtown Penthouse. Client loved the view but wants more square footage.' },
    { type: 'email', title: 'Sent Property List', date: 'Nov 18, 2023', desc: 'Emailed 5 properties matching the new criteria.' }
  ];

  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{customer.name}</h1>
            <CustomerStatusBadge status={customer.status} />
          </div>
          <div className="flex items-center text-muted-foreground mt-1 text-sm">
            <span className="font-medium mr-4">Customer ID: {customer.id}</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Added {formatDate(customer.createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
             <Link href="/dashboard/customers">Back to list</Link>
          </Button>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href={`/dashboard/customers/${customer.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Quick Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                <p className="text-sm font-medium text-muted-foreground">Target Budget</p>
              </div>
              <h3 className="text-2xl font-bold">{formatCurrency(customer.budget, customer.currency)}</h3>
            </div>
            <div className="bg-card border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><MapPin className="w-5 h-5" /></div>
                <p className="text-sm font-medium text-muted-foreground">Preferred Area</p>
              </div>
              <h3 className="text-xl font-bold truncate" title={customer.preferredArea}>{customer.preferredArea}</h3>
            </div>
            <div className="bg-card border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><Clock className="w-5 h-5" /></div>
                <p className="text-sm font-medium text-muted-foreground">Last Contact</p>
              </div>
              <h3 className="text-xl font-bold">{formatDate(customer.lastFollowUp)}</h3>
            </div>
          </section>

          {/* Requirements & Notes Box */}
          <section className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> Requirements
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /> Looking for a 3+ bedroom property.</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /> Must have a private garden.</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /> Close proximity to top-tier international schools.</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /> Move-in ready, no major renovations.</li>
                </ul>
              </div>
              <div className="p-6 bg-muted/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> Internal Notes
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Highly motivated buyer. They are relocating due to work in 3 months and are eager to finalize something soon. Pre-approved for mortgage up to $1.5M. Prefers evening viewings on weekdays.
                </p>
              </div>
            </div>
          </section>

          {/* Interested Properties */}
          <section className="bg-card border rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" /> Interested Properties
            </h3>
            <div className="space-y-3">
              {interestedProperties.map(prop => (
                <div key={prop.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-xl hover:border-primary transition-colors cursor-pointer group">
                  <div>
                    <Link href={`/dashboard/properties/${prop.id}`} className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {prop.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{prop.id} • {prop.status}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 font-bold text-lg">
                    {formatCurrency(prop.price, 'USD')}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 border-dashed">
                + Suggest New Property
              </Button>
            </div>
          </section>

          {/* Timeline / Recent Activity */}
          <section className="bg-card border rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" /> Recent Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {recentActivity.map((activity, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-0 z-10 text-primary">
                    {activity.type === 'call' && <Phone className="w-4 h-4" />}
                    {activity.type === 'viewing' && <Home className="w-4 h-4" />}
                    {activity.type === 'email' && <Mail className="w-4 h-4" />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted/30 p-4 rounded-xl border shadow-sm ml-4 md:ml-0 hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{activity.title}</h4>
                    </div>
                    <p className="text-xs text-primary font-medium mb-2">{activity.date}</p>
                    <p className="text-sm text-muted-foreground">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="xl:col-span-1 space-y-6">
          
          {/* Quick Actions Card */}
          <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-6">
            
            {/* Contact Details Overview */}
            <div className="mb-6 pb-6 border-b space-y-4">
              <h3 className="font-semibold text-lg">Contact Details</h3>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 bg-muted rounded-full text-muted-foreground"><Phone className="w-4 h-4" /></div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-foreground">{customer.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 bg-muted rounded-full text-muted-foreground"><Mail className="w-4 h-4" /></div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href={`mailto:${customer.email}`} className="text-primary hover:underline">{customer.email}</a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              
              <Button className="w-full justify-start h-11 bg-green-600 hover:bg-green-700 text-white" asChild>
                <a href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                  <MessageCircle className="w-4 h-4 mr-3" /> WhatsApp Message
                </a>
              </Button>
              
              <Button className="w-full justify-start h-11" variant="outline" asChild>
                <a href={`tel:${customer.phone}`}>
                  <Phone className="w-4 h-4 mr-3" /> Call Customer
                </a>
              </Button>
              
              <div className="pt-4 mt-4 border-t space-y-3">
                <Button className="w-full justify-start h-11" variant="ghost" asChild>
                  <Link href={`/dashboard/customers/${customer.id}/edit`}>
                    <Edit className="w-4 h-4 mr-3" /> Edit Profile
                  </Link>
                </Button>
                <Button 
                  className="w-full justify-start h-11 text-destructive hover:text-destructive hover:bg-destructive/10" 
                  variant="ghost"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash className="w-4 h-4 mr-3" /> Delete Customer
                </Button>
              </div>
            </div>
          </div>
          
        </aside>
      </div>

      <DeleteCustomerModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        customerName={customer.name}
        customerId={customer.id}
        onSuccess={() => {
          router.push('/dashboard/customers');
        }}
      />
    </div>
  );
}
