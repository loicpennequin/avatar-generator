import { z } from 'zod';
import { procedure, router } from '../trpc';
import bcrypt from 'bcrypt';

export const userRouter = router({
  onboard: procedure
    .input(
      z.object({
        name: z.string().nullish()
      })
    )
    .meta({ needsAuth: true })
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.update({
        where: { id: ctx.session!.user.id },
        data: {
          name: input.name,
          onboardingDone: true
        }
      });

      return { success: true };
    }),

  signup: procedure
    .input(
      z.object({
        email: z.string().email().trim(),
        password: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.user.create({
        data: {
          email: input.email,
          accounts: {
            create: {
              type: 'credentials',
              provider: 'credentials',
              providerAccountId: '',
              passwordHash: bcrypt.hashSync(input.password, 10)
            }
          }
        }
      });
    })
});
