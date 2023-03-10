import { Db } from '~/server/db';
import { z } from 'zod';
import { hashSync } from 'bcrypt';
type Deps = { db: Db };
export const signupDto = z.object({
  email: z.string().email().trim(),
  password: z.string()
});
export type SignupDto = z.infer<typeof signupDto>;

export const signupUseCase =
  ({ db }: Deps) =>
  async (dto: SignupDto) => {
    const user = await db.user.create({
      data: {
        email: dto.email,
        accounts: {
          create: {
            type: 'credentials',
            provider: 'credentials',
            providerAccountId: '',
            passwordHash: hashSync(dto.password, 10)
          }
        }
      }
    });

    return user;
  };
