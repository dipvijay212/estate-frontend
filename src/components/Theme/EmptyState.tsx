import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Heading, Body } from './Typography';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center bg-card rounded-2xl shadow-sm border',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>
      )}
      <Heading className="text-2xl mb-2">{title}</Heading>
      {description && <Body className="text-muted-foreground max-w-sm mt-0">{description}</Body>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
