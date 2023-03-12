import { hashSync } from 'bcrypt';
import { SignupDto } from '~/server/dtos/user';
import { UserRepository } from '~/server/services/userRepository';

type Deps = { userRepository: UserRepository };

export const signupUseCase =
  ({ userRepository }: Deps) =>
  async (dto: SignupDto) => {
    const user = await userRepository.create({
      email: dto.email,
      passwordHash: hashSync(dto.password, 10)
    });

    return user;
  };
