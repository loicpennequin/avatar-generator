import { NuxtAuthHandler } from '#auth';
import { User as PrismaUser } from '@prisma/client';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '~/server/db';
import * as bcrypt from 'bcrypt';

type SigninCredentials = {
  email: string;
  password: string;
};

declare module 'next-auth' {
  interface User extends PrismaUser {}
  interface Session {
    user: User;
  }
}
export default NuxtAuthHandler({
  secret: 'your-secret-here',

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: '/signin'
  },

  adapter: PrismaAdapter(db),

  callbacks: {
    async session({ session }) {
      if (!session.user || !session.user.email) return session;

      const user = await db.user.findUnique({
        where: { email: session.user.email }
      });

      return {
        ...session,
        user: user!
      };
    }
  },

  providers: [
    // @ts-expect-error
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret
    }),
    // @ts-expect-error
    DiscordProvider.default({
      clientId: useRuntimeConfig().discordClientId,
      clientSecret: useRuntimeConfig().discordClientSecret
    }),
    // @ts-expect-error
    GoogleProvider.default({
      clientId: useRuntimeConfig().googleClientId,
      clientSecret: useRuntimeConfig().googleClientSecret
    }),
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'e-mail',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials: SigninCredentials) {
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: {
            accounts: {
              select: { passwordHash: true },
              where: { provider: 'credentials' }
            }
          }
        });

        if (!user || user.accounts.length === 0) return null;

        const [account] = user.accounts;
        const isValid = bcrypt.compareSync(
          credentials.password,
          account.passwordHash as string
        );

        if (!isValid) return null;

        return user;
      }
    })
  ]
});
