'use client';

import {SessionProvider} from 'next-auth/react';
import {ThemeProvider} from 'next-themes';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

export const Providers = ({children}: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};
