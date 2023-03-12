import { z } from 'zod';

export const userResponseDto = z
  .object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    email: z.string().nullable().optional(),
    image: z.string().nullable(),
    tosAcceptedAt: z.date().nullable()
  })
  .strict();
export type UserResponseDto = z.infer<typeof userResponseDto>;

export const signupDto = z.object({
  email: z.string().email().trim(),
  isTosAccepted: z.literal(true),
  password: z.string()
});
export type SignupDto = z.infer<typeof signupDto>;
