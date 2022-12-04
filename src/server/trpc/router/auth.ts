import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import bcrypt from 'bcryptjs';

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string(),
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
            name: input.name,
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
    .query(async ({ ctx, input }) => {
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
});
