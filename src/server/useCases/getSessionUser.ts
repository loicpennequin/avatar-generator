import { Db } from '../db';

type Deps = { db: Db };

export const getSessionUserUseCase =
  ({ db }: Deps) =>
  (email: string) =>
    db.user.findUnique({
      where: { email }
    });

export type GetSessionUseCase = ReturnType<typeof getSessionUserUseCase>;
