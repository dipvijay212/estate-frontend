import React from 'react';
import { Plus, UserPlus, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    { title: 'Add Property', icon: Plus, variant: 'default' as const, href: '/dashboard/properties/new' },
    { title: 'Add Lead', icon: UserPlus, variant: 'secondary' as const, href: '/dashboard/leads/new' },
    { title: 'Create Report', icon: FileText, variant: 'outline' as const, href: '/dashboard' },
    { title: 'Send Campaign', icon: Send, variant: 'outline' as const, href: '/dashboard' },
  ];

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <Button 
              key={i} 
              variant={action.variant} 
              className="h-auto py-3 px-4 justify-start rounded-xl transition-all hover:scale-[1.02]"
              asChild
            >
              <Link href={action.href} className="flex flex-col items-start gap-2">
                <Icon size={20} className={action.variant === 'default' ? 'text-primary-foreground' : 'text-primary'} />
                <span className="font-medium">{action.title}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
