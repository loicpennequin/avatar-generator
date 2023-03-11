import { Configuration, OpenAIApi } from 'openai';
import { GenerateImageDto } from '../dtos/image';
import { TRPCError } from '@trpc/server';

export const aiService = () => {
  const runtimeConfig = useRuntimeConfig();

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: runtimeConfig.openaiKey
    })
  );

  return {
    generateImage: async ({ prompt, style, color }: GenerateImageDto) => {
      const response = await openai.createImage({
        prompt: `A beautiful, detailed picture of ${prompt} with ${color} as the main color, in an ${style} art style`,
        n: 1,
        size: '1024x1024'
      });

      const imageURL = response.data.data[0].url;

      if (!imageURL) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No image returned from openAI'
        });
      }

      return imageURL;
    }
  };
};

export type AiService = ReturnType<typeof aiService>;
