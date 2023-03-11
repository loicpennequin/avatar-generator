import { GeneratedImage } from '@prisma/client';
import { Session } from 'next-auth';
import { ImageResponseDto } from '~/server/dtos/image';
import { UploadService } from '~/server/services/uploadService';

type Deps = { session: Session; uploadService: UploadService };

export const imageMapper = ({ session, uploadService }: Deps) => {
  return {
    toResponseDto(image: GeneratedImage): ImageResponseDto {
      const isOwned = image.ownerId === session.user.id;

      return {
        id: image.id,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
        ownerId: image.ownerId,
        url: isOwned ? uploadService.getFullUrl(image.url) : undefined,
        miniatureUrl: uploadService.getFullUrl(image.miniatureUrl)
      };
    }
  };
};

export type ImageMapper = ReturnType<typeof imageMapper>;
