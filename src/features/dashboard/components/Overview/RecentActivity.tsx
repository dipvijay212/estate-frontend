import React from 'react';
import { Home, UserPlus, CheckCircle2, FileText } from 'lucide-react';

import { Activity } from '@/services/mock/dashboard.service';

interface RecentActivityProps {
  activities: Activity[];
}

const getIconConfig = (type: string) => {
  switch (type) {
    case 'property': return { icon: Home, color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    case 'lead': return { icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-500/10' };
    case 'task': return { icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/10' };
    case 'contract': return { icon: FileText, color: 'text-amber-500', bg: 'bg-amber-500/10' };
    default: return { icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/10' };
  }
};

export function RecentActivity({ activities }: RecentActivityProps) {

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm h-full">
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
      
      <div className="relative pl-6 border-l border-border/50 space-y-8 py-2">
        {activities.length === 0 ? (
          <div className="text-muted-foreground text-sm text-center py-4">No recent activity</div>
        ) : (
          activities.map((activity) => {
            const { icon: Icon, color, bg } = getIconConfig(activity.type);
            return (
              <div key={activity.id} className="relative">
                <div className={`absolute -left-[35px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center ${bg} ${color} ring-4 ring-card`}>
                  <Icon size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{activity.desc}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
