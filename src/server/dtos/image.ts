import { z } from 'zod';

export const generateImageDto = z.object({
  prompt: z.string(),
  color: z.string(),
  style: z.string()
});
export type GenerateImageDto = z.infer<typeof generateImageDto>;
