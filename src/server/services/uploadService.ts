import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';

export const uploadService = () => {
  const runtimeConfig = useRuntimeConfig();

  const client = new S3Client({
    region: 'eu-west-3',
    credentials: {
      accessKeyId: runtimeConfig.awsAccessKey,
      secretAccessKey: runtimeConfig.awsSecretAccessKey
    }
  });

  return {
    getFullUrl(id: string) {
      return `https://${runtimeConfig.awsS3Bucket}.s3.eu-west-3.amazonaws.com/${id}`;
    },

    uploadImage: async (buffer: Buffer) => {
      const objectId = `${nanoid(10)}.png`;

      await client.send(
        new PutObjectCommand({
          Body: buffer,
          Bucket: runtimeConfig.awsS3Bucket,
          Key: objectId
        })
      );

      return objectId;
    }
  };
};

export type UploadService = ReturnType<typeof uploadService>;
