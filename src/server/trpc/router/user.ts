import { signupDto } from '../../dtos/user';
import { authenticatedProcedure, procedure, router } from '../trpc';

export const userRouter = router({
  signup: procedure.input(signupDto).mutation(async ({ input, ctx }) => {
    const useCase = ctx.resolve('signupUseCase');
    const user = await useCase(input);
    return user;
  }),

  acceptTos: authenticatedProcedure.mutation(async ({ ctx }) => {
    const useCase = ctx.resolve('acceptTosUseCase');
    const session = ctx.resolve('session');

    const user = await useCase(session.user.id);

    return user;
  })
});
