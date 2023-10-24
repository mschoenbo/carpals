import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {Providers} from '@/components/Providers';
import {Toaster} from '@/components/ui/toaster';
import {cn} from '@/lib/utils';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background antialiased', inter.className)}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
