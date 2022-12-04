import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const adminRouer = router({
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.delete({
          where: {
            id: input,
          },
        });
        return {
          message: 'Success',
        };
      } catch (error) {
        console.log(error);
      }
    }),
});
