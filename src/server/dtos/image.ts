import { z } from 'zod';

export const imageResponseDto = z
  .object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    ownerId: z.string(),
    url: z.string().optional(),
    miniatureUrl: z.string()
  })
  .strict();
export type ImageResponseDto = z.infer<typeof imageResponseDto>;

export const generateImageDto = z.object({
  prompt: z.string(),
  color: z.string(),
  style: z.string()
});
export type GenerateImageDto = z.infer<typeof generateImageDto>;
