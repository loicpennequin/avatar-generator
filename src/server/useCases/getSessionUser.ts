import { UserRepository } from '../services/userRepository';

type Deps = { userRepository: UserRepository };

export const getSessionUserUseCase =
  ({ userRepository }: Deps) =>
  (email: string) =>
    userRepository.findByEmail({ email });

export type GetSessionUseCase = ReturnType<typeof getSessionUserUseCase>;
