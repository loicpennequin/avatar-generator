import { Db, DbTransaction } from '../db';

type Deps = { db: Db };
export const userRepository = ({ db }: Deps) => {
  return {
    findByEmail: ({ email }: { email: string }) =>
      db.user.findUnique({
        where: { email }
      }),

    findByEmailWithAccountByProvider: ({
      email,
      provider
    }: {
      email: string;
      provider: string;
    }) =>
      db.user.findUnique({
        where: { email },
        include: {
          accounts: {
            where: { provider }
          }
        }
      }),

    create: ({
      email,
      passwordHash
    }: {
      email: string;
      passwordHash: string;
    }) => {
      db.user.create({
        data: {
          email,
          tosAcceptedAt: new Date(),
          accounts: {
            create: {
              type: 'credentials',
              provider: 'credentials',
              providerAccountId: '',
              passwordHash
            }
          }
        }
      });
    },

    acceptTos: ({ userId }: { userId: string }) => {
      db.user.update({
        where: { id: userId },
        data: {
          tosAcceptedAt: new Date()
        }
      });
    },

    removeCredits: (
      { userId, amount }: { userId: string; amount: number },
      tx?: DbTransaction
    ) => {
      const _db = tx ?? db;

      return _db.user.update({
        data: {
          credits: {
            decrement: amount
          }
        },
        where: {
          id: userId
        }
      });
    }
  };
};

export type UserRepository = ReturnType<typeof userRepository>;
