import { z } from 'zod';

export const signupDto = z.object({
  email: z.string().email().trim(),
  isTosAccepted: z.literal(true),
  password: z.string()
});
export type SignupDto = z.infer<typeof signupDto>;
