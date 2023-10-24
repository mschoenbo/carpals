'use client';

import {useSession} from 'next-auth/react';
import Link from 'next/link';

export const SignInButton = () => {
  const {data: session} = useSession();

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p>{session.user?.givenName}</p>
        <Link href={'/api/auth/signout'} className="flex gap-4 ml-auto text-red-600">
          Sign Out
        </Link>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto items-center">
      <Link href={'/api/auth/signin'} className="flex gap-4 ml-auto text-green-600">
        Sign In
      </Link>
    </div>
  );
};
