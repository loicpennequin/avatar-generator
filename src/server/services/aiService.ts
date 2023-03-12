import { Configuration, OpenAIApi } from 'openai';
import { GenerateImageDto } from '../dtos/image';
import { TRPCError } from '@trpc/server';
import { errorMessages } from '../errorMessages';

export const aiService = () => {
  const runtimeConfig = useRuntimeConfig();

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: runtimeConfig.openaiKey
    })
  );

  const artStyleKeywordDictionnary: Record<string, string[]> = {
    anime: [
      'detailed anime key visual',
      'eye level shot',
      'Kyoto Animation',
      'Top Pixiv',
      'HD'
    ],
    comics: [
      'detailed comic book key visual',
      'eye level shot',
      'marvel',
      'DC comics',
      'HD'
    ],
    realistic: [
      'realistic',
      'HD',
      'eye level shot',
      'professional photography'
    ],
    cartoon: [
      'Cartoon',
      'eye level shot',
      'HD',
      'Trending on ArtStation',
      'Professional Digital Art',
      'cell shading'
    ]
  };
  return {
    generateImage: async ({ prompt, style, color }: GenerateImageDto) => {
      try {
        const artStyleKeyWords = artStyleKeywordDictionnary[style] ?? [];
        const response = await openai.createImage({
          prompt: `${prompt}, profile picture, ${color}, ${artStyleKeyWords.join(
            ', '
          )}`,
          n: 1,
          size: '1024x1024'
        });
        const imageURL = response.data.data[0].url;

        if (!imageURL) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR'
          });
        }

        return imageURL;
      } catch (err: any) {
        if (err.isAxiosError) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: errorMessages.INVALID_PROMPT
          });
        }
        throw err;
      }
    }
  };
};

export type AiService = ReturnType<typeof aiService>;
