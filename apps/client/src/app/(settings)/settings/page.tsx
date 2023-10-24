import {redirect} from 'next/navigation';

import {authOptions} from '@/lib/auth';
import {DashboardHeader} from '@/components/header';
import {DashboardShell} from '@/components/shell';
import {getServerSession} from 'next-auth';
import {UserNameForm} from '@/components/forms/user-name-form';

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div className="grid gap-10">
      <UserNameForm user={session.user} />
    </div>
  );
}
