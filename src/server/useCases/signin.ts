import { compareSync } from 'bcrypt';
import { UserRepository } from '../services/userRepository';

export type Credentials = {
  email: string;
  password: string;
};

type Deps = { userRepository: UserRepository };

export const signinUseCase =
  ({ userRepository }: Deps) =>
  async (credentials: Credentials) => {
    const user = await userRepository.findByEmailWithAccountByProvider({
      email: credentials.email,
      provider: 'credentials'
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
