import { language } from '@prisma/client';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const lawyerInput = z.object({
  institution: z.string(),
  course: z.string(),
  experience: z.number(),
  description: z.string(),
  country: z.string(),
  expertise: z.string(),
  services: z.array(z.string()),
  state: z.string(),
  image: z.string(),
  price: z.number(),
  language: z.nativeEnum(language).optional(),
});

export const lawyerRouter = router({
  create: protectedProcedure
    .input(lawyerInput)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.lawyer.create({
          data: {
            lawyerId: ctx.session.user.id,
            institution: input.institution,
            course: input.course,
            experience: input.experience,
            description: input.description,
            country: input.country,
            expertise: input.expertise,
            services: input.services,
            state: input.state,
            image: input.image,
            price: input.price,
            language: input.language,
          },
        });
        await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id
          },
          data: {
            role: "LAWYER"
          }
        })
        return {
          message: 'Success',
        };
      } catch (error) {
        console.log(error);
      }
    }),
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await ctx.prisma.lawyer.delete({
        where: {
          lawyerId: ctx.session.user.id,
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
