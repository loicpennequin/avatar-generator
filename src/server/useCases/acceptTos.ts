import { Session } from 'next-auth';
import { UserRepository } from '../services/userRepository';

type Deps = { session: Session; userRepository: UserRepository };

export const acceptTosUseCase =
  ({ session, userRepository }: Deps) =>
  () => {
    return userRepository.acceptTos({ userId: session.user.id });
  };

export type AcceptTosUseCase = ReturnType<typeof acceptTosUseCase>;
