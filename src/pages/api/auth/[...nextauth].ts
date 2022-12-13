import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/server/db/client';
import { env } from '../../../env/server.mjs';
import bcrypt from 'bcryptjs';
import { AuthError } from '@/pages/signin';
import type { Role, User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
        session.role = token.role as Role;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as User).role;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!password) {
          throw new Error(`${AuthError.NO_PASSWORD}`);
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && user.password) {
          const isPasswordMatched = await bcrypt.compare(
            password,
            user?.password
          );

          if (isPasswordMatched) {
            return { ...user, password: undefined };
          } else {
            throw new Error(`${AuthError.WRONG_PASSWORD}`);
          }
        } else {
          throw new Error(`${AuthError.EMAIL_DOESNT_EXIST}`);
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
};

export default NextAuth(authOptions);
