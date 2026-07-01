import React from 'react';
import { BusinessSettingsForm } from '@/features/settings/components/BusinessSettingsForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BusinessSettingsPage() {
  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="icon" asChild className="rounded-full shrink-0">
          <Link href="/dashboard/settings">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Business Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Update your company information and compliance details.
          </p>
        </div>
      </div>
      
      <div className="w-full">
        <BusinessSettingsForm />
      </div>
    </div>
  );
}
