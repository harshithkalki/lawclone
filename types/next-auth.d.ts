import { Role } from '@prisma/client';
import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    role: Role;
  }
}
