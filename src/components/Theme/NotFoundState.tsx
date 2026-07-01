import React from 'react';
import { FileQuestion } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface NotFoundStateProps {
  title?: string;
  description?: string;
  returnTo?: string;
  returnLabel?: string;
}

export function NotFoundState({
  title = 'Page Not Found',
  description = "The page or resource you are looking for doesn't exist or has been moved.",
  returnTo = '/',
  returnLabel = 'Return Home',
}: NotFoundStateProps) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <EmptyState
        icon={FileQuestion}
        title={title}
        description={description}
        className="max-w-md w-full"
        action={
          <Link href={returnTo}>
            <Button variant="default">{returnLabel}</Button>
          </Link>
        }
      />
    </div>
  );
}
