import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Heading({ children, className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn('text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export function SubHeading({ children, className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn('text-2xl font-semibold tracking-tight transition-colors first:mt-0', className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Body({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props}>
      {children}
    </p>
  );
}

export function Caption({ children, className, ...props }: TypographyProps) {
  return (
    <span className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </span>
  );
}
