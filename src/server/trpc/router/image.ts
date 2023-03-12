import { generateImageDto } from '../../dtos/image';
import { authenticatedProcedure, router } from '../trpc';

export const imageRouter = router({
  generate: authenticatedProcedure
    .input(generateImageDto)
    .mutation(async ({ input, ctx }) => {
      const useCase = ctx.resolve('generateImageUseCase');
      const mapper = ctx.resolve('imageMapper');

      const image = await useCase(input);
      return mapper.toResponseDto(image);
    })
});
