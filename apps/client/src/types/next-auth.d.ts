import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      givenName: string;
      familyName: string;
      email: string;
    };

    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      givenName: string;
      familyName: string;
      email: string;
    };

    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
