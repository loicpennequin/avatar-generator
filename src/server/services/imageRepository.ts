import { Db, DbTransaction } from '../db';
import { GenerateImageDto } from '../dtos/image';

type Deps = { db: Db };
export const imageRepository = ({ db }: Deps) => {
  return {
    create: (
      data: GenerateImageDto & {
        ownerId: string;
        url: string;
        miniatureUrl: string;
      },
      tx?: DbTransaction
    ) => {
      const _db = tx ?? db;
      return _db.generatedImage.create({
        data
      });
    }
  };
};

export type ImageRepository = ReturnType<typeof imageRepository>;
