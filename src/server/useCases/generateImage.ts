import { GenerateImageDto } from '~/server/dtos/image';
import { Db } from '~/server/db';
import { Session } from 'next-auth';
import { UploadImageUseCase } from './uploadImage';
import { AiService } from '../services/aiService';

type Deps = {
  db: Db;
  session: Session;
  aiService: AiService;
  uploadImageUseCase: UploadImageUseCase;
};

export const generateImageUseCase =
  ({ db, session, aiService, uploadImageUseCase }: Deps) =>
  async ({ prompt, color, style }: GenerateImageDto) => {
    const imageURL = await aiService.generateImage({ prompt, color, style });
    const [url, miniatureUrl] = await uploadImageUseCase(imageURL);

    return db.generatedImage.create({
      data: {
        ownerId: session.user.id,
        url,
        miniatureUrl,
        prompt,
        color,
        style
      }
    });
  };
