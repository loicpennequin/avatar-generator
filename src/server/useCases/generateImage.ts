import { Configuration, OpenAIApi } from 'openai';
import { GenerateImageDto } from '../dtos/image';

export const generateImageUseCase =
  () =>
  async ({ prompt }: GenerateImageDto) => {
    const runtimeConfig = useRuntimeConfig();

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: runtimeConfig.openAiKey
      })
    );

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024'
    });

    return response.data.data[0].url;
  };
