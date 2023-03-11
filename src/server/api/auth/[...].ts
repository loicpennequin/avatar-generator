import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '~/server/db';
import { container } from '~/server/container';
import { UserResponseDto } from '~/server/dtos/user';

type SigninCredentials = {
  email: string;
  password: string;
};

declare module 'next-auth' {
  interface User extends UserResponseDto {}
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
    async session(arg) {
      const { session } = arg;
      if (!session.user || !session.user.email) return session;

      const useCase = container.resolve('getSessionUserUseCase');
      const user = await useCase(session.user.email);
      if (user) {
        const mapper = container.resolve('userMapper');
        session.user = mapper.toResponseDto(user, { forceSelf: true });
      }

      return session;
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
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials: SigninCredentials) {
        const signinUseCase = container.resolve('signinUseCase');
        const user = await signinUseCase(credentials);

        return user;
      }
    })
  ]
});
