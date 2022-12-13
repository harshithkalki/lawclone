import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

export const userRouter = router({
  submitLawyerForm: protectedProcedure
    .input(
      z.object({
        institution: z.string(),
        course: z.string(),
        experience: z.number(),
        description: z.string(),
        fullName: z.string(),
        services: z.string(),
        expertise: z.string(),
        state: z.string(),
        country: z.string(),
        image: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },

          data: {
            role: 'LAWYER',
            lawyer: {
              create: {
                course: input.course,
                experience: input.experience,
                institution: input.institution,
                description: input.description,
                image: input.image,
                services: input.services,
                expertise: input.expertise,
                state: input.state,
                country: input.country,
                price: input.price,
              },
            },
          },
        });

        return {
          message: 'Lawyer details added successfully',
        };
      } catch (error) {
        console.log(error);
      }
    }),
    getLawyers: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const lawyers = await ctx.prisma.user.findMany({
        take: 6,
        where: {
          role: "LAWYER",
          username: {
            contains: input,
            mode: 'insensitive'
          }
        },
      });
      const usernames = lawyers?.map((lawyer) => lawyer.username);
      return { usernames };
    }),
});
