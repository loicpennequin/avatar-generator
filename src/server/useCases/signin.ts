import { Db } from '../db';
import { compareSync } from 'bcrypt';

export type Credentials = {
  email: string;
  password: string;
};

type Deps = {
  db: Db;
};
export const signinUseCase =
  ({ db }: Deps) =>
  async (credentials: Credentials) => {
    const user = await db.user.findUnique({
      where: { email: credentials.email },
      include: {
        accounts: {
          select: { passwordHash: true },
          where: { provider: 'credentials' }
        }
      }
    });

    if (!user || user.accounts.length === 0) return null;

    const [account] = user.accounts;
    const isValid = compareSync(
      credentials.password,
      account.passwordHash as string
    );

    if (!isValid) return null;

    return user;
  };

export type SigninUseCase = ReturnType<typeof signinUseCase>;
