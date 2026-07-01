import React from 'react';
import { SecuritySettingsForm } from '@/features/settings/components/SecuritySettingsForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SecuritySettingsPage() {
  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-8 max-w-[1600px] mx-auto w-full">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="icon" asChild className="rounded-full shrink-0">
          <Link href="/dashboard/settings">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Account & Security</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your personal profile, passwords, and security settings.
          </p>
        </div>
      </div>
      
      <div className="w-full">
        <SecuritySettingsForm />
      </div>
    </div>
  );
}
