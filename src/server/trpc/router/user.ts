import { procedure, router } from '../trpc';
import { signupDto } from '~/server/useCases/signup';

export const userRouter = router({
  signup: procedure.input(signupDto).mutation(async ({ input, ctx }) => {
    const signupUseCase = ctx.resolve('signupUseCase');
    const user = await signupUseCase(input);
    return user;
  })
});
