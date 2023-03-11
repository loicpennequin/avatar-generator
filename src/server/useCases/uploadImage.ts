import { UploadService } from '../services/uploadService';
import sharp from 'sharp';

type Deps = { uploadService: UploadService };
export const uploadImageUseCase =
  ({ uploadService }: Deps) =>
  async (url: string) => {
    const arrayBuffer = await $fetch<ArrayBuffer>(url, {
      responseType: 'arrayBuffer'
    });

    const buffer = Buffer.from(arrayBuffer);
    const miniatureBuffer = await sharp(Buffer.from(arrayBuffer))
      .resize({ width: 200 })
      .toBuffer();

    return Promise.all([
      uploadService.uploadImage(buffer),
      uploadService.uploadImage(miniatureBuffer)
    ]);
  };

export type UploadImageUseCase = ReturnType<typeof uploadImageUseCase>;
