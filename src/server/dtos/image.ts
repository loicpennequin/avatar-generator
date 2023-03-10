import { z } from 'zod';

export const generateImageDto = z.object({
  prompt: z.string()
});
export type GenerateImageDto = z.infer<typeof generateImageDto>;
