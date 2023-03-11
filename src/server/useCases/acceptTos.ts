import { Session } from 'next-auth';
import { Db } from '../db';

type Deps = { db: Db; session: Session };

export const acceptTosUseCase =
  ({ db, session }: Deps) =>
  () => {
    return db.user.update({
      where: { id: session.user.id },
      data: {
        tosAcceptedAt: new Date()
      }
    });
  };

export type AcceptTosUseCase = ReturnType<typeof acceptTosUseCase>;
