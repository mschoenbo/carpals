import {NextAuthOptions} from 'next-auth';
import {JWT} from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import {env} from 'process';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Refresh ${token.tokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    tokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) return null;
        const {username, password} = credentials;

        const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }

        const user = await res.json();
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) return {...token, ...user};

      if (new Date().getTime() < token.tokens.expiresIn) return token;

      return await refreshToken(token);
    },
    async session({token, session}) {
      session.user = token.user;
      session.tokens = token.tokens;

      return session;
    },
  },
};
