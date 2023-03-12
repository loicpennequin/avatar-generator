import { GenerateImageDto } from '~/server/dtos/image';
import { Db } from '~/server/db';
import { Session } from 'next-auth';
import { UploadImageUseCase } from './uploadImage';
import { AiService } from '../services/aiService';
import { UserRepository } from '../services/userRepository';
import { ImageRepository } from '../services/imageRepository';
import { errorMessages } from '../errorMessages';

type Deps = {
  db: Db;
  session: Session;
  aiService: AiService;
  userRepository: UserRepository;
  imageRepository: ImageRepository;
  uploadImageUseCase: UploadImageUseCase;
};

export const generateImageUseCase =
  ({
    db,
    session,
    aiService,
    userRepository,
    imageRepository,
    uploadImageUseCase
  }: Deps) =>
  (dto: GenerateImageDto) => {
    return db.$transaction(async (tx) => {
      const { prompt, color, style } = dto;
      const user = await userRepository.removeCredits(
        { userId: session.user.id, amount: 1 },
        tx
      );

      if (user.credits < 0) {
        throw new Error(errorMessages.NOT_ANOUGH_CREDITS);
      }

      const imageURL = await aiService.generateImage({ prompt, color, style });
      const [url, miniatureUrl] = await uploadImageUseCase(imageURL);

      return imageRepository.create({
        ownerId: session.user.id,
        url,
        miniatureUrl,
        ...dto
      });
    });
  };
