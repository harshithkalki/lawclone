import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import bcrypt from 'bcryptjs';

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const password = await bcrypt.hash(input.password, 10);

      try {
        await ctx.prisma.user.create({
          data: {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            username: input.username,
            password: password,
          },
        });
        return {
          success: true,
          message: 'Account created',
        };
      } catch (error) {
        return {
          success: false,
          error,
        };
      }
    }),
  isEmailExists: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input,
        },
      });

      if (user) {
        return {
          success: true,
          message: 'Email already exists',
        };
      } else {
        return {
          success: false,
          message: 'Email does not exist',
        };
      }
    }),
  isUsernameExists: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input,
        },
      });

      if (user) {
        return {
          success: true,
          message: 'Username already exists',
        };
      } else {
        return {
          success: false,
          message: 'Username does not exist',
        };
      }
    }),
});
