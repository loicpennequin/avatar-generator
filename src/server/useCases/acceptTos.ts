import { Db } from '../db';

type Deps = { db: Db };

export const acceptTosUseCase =
  ({ db }: Deps) =>
  async (id: string) => {
    await db.user.update({
      where: { id },
      data: {
        tosAcceptedAt: new Date()
      }
    });
  };

export type AcceptTosUseCase = ReturnType<typeof acceptTosUseCase>;
