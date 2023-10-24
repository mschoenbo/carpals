import {MainNav} from '@/components/layout/main-nav';
import {DashboardNav} from '@/components/layout/nav';
import {SiteFooter} from '@/components/layout/site-footer';
import {UserAccountNav} from '@/components/layout/user-account-nav';
import {dashboardConfig} from '@/config/dashboard';
import {authOptions} from '@/lib/auth';
import {getServerSession} from 'next-auth';
import {useSession} from 'next-auth/react';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default async function DashboardLayout({children}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return notFound();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: `${user.givenName} ${user.familyName}`,
              image: null,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
