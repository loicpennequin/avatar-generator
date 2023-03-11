import { signupDto, userResponseDto } from '../../dtos/user';
import { authenticatedProcedure, procedure, router } from '../trpc';

export const userRouter = router({
  signup: procedure
    .input(signupDto)
    .output(userResponseDto)
    .mutation(async ({ input, ctx }) => {
      const useCase = ctx.resolve('signupUseCase');
      const user = await useCase(input);

      const mapper = ctx.resolve('userMapper');

      return mapper.toResponseDto(user);
    }),

  acceptTos: authenticatedProcedure
    .output(userResponseDto)
    .mutation(async ({ ctx }) => {
      const useCase = ctx.resolve('acceptTosUseCase');
      const user = await useCase();

      const mapper = ctx.resolve('userMapper');

      return mapper.toResponseDto(user);
    })
});
