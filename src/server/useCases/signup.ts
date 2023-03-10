import { Db } from '~/server/db';
import { hashSync } from 'bcrypt';
import { SignupDto } from '../dtos/user';
type Deps = { db: Db };

export const signupUseCase =
  ({ db }: Deps) =>
  async (dto: SignupDto) => {
    const user = await db.user.create({
      data: {
        email: dto.email,
        tosAcceptedAt: new Date(),
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
