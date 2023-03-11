import {
  AwilixContainer,
  createContainer,
  Resolver,
  ResolveOptions,
  asFunction,
  asValue
} from 'awilix';
import { Session } from 'next-auth';
import { db } from '~/server/db';
import { H3Event } from 'h3';
import { getServerSession } from '#auth';
import { AsyncReturnType } from '~~/src/utils/types';

import { signupUseCase } from './useCases/signup';
import { getSessionUserUseCase } from '~/server/useCases/getSessionUser';
import { signinUseCase } from '~/server/useCases/signin';
import { acceptTosUseCase } from './useCases/acceptTos';
import { generateImageUseCase } from './useCases/generateImage';
import { uploadImageUseCase } from './useCases/uploadImage';
import { uploadService } from './services/uploadService';
import { aiService } from './services/aiService';
import { userMapper } from './mappers/user';

const injectables = {
  db: asValue(db),

  getSessionUserUseCase: asFunction(getSessionUserUseCase),
  signinUseCase: asFunction(signinUseCase),
  signupUseCase: asFunction(signupUseCase),
  acceptTosUseCase: asFunction(acceptTosUseCase),
  generateImageUseCase: asFunction(generateImageUseCase),
  uploadImageUseCase: asFunction(uploadImageUseCase),

  uploadService: asFunction(uploadService),
  aiService: asFunction(aiService),

  userMapper: asFunction(userMapper)
};

type ContainerDefinition = Record<string, Resolver<unknown>>;
type ExtractResolverType<T> = T extends Resolver<infer X> ? X : null;

interface TypedAwilixContainer<T extends ContainerDefinition>
  extends Pick<
    AwilixContainer,
    Exclude<keyof AwilixContainer, 'resolve' | 'cradle'>
  > {
  resolve<K extends keyof T>(
    key: K,
    resolveOptions?: ResolveOptions
  ): ExtractResolverType<T[K]>;
  cradle: {
    [K in keyof T]: ExtractResolverType<T[K]>;
  };
}

export const createTypedContainer = <T extends ContainerDefinition>(
  registrations: T
): TypedAwilixContainer<T> => {
  const container = createContainer().register(registrations);

  return container;
};

export const container = createTypedContainer(injectables);

export type Container = typeof container;
export type RequestScopedContainer = TypedAwilixContainer<
  typeof injectables & {
    session: Resolver<AsyncReturnType<typeof getServerSession>>;
  }
>;
export type AuthenticatedRequestScopedContainer = TypedAwilixContainer<
  typeof injectables & {
    session: Resolver<Session>;
  }
>;

export const createRequestScope = async (
  event: H3Event
): Promise<RequestScopedContainer> =>
  container.createScope().register({
    session: asValue(await getServerSession(event))
  }) as RequestScopedContainer;
