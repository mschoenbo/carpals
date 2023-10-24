import {Separator} from '@/components/ui/separator';
import {authOptions} from '@/lib/auth';
import {getServerSession} from 'next-auth';
import {useEffect, useState} from 'react';
import {CarsListComponent} from './cars-list';

export default async function CarSettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cars</h3>
        <p className="text-sm text-muted-foreground">Manage your cars here.</p>
      </div>
      <Separator />
      <div>
        <CarsListComponent session={session} />
      </div>
    </div>
  );
}
