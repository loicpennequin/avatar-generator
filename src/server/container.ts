import {
  AwilixContainer,
  createContainer,
  Resolver,
  ResolveOptions,
  asFunction,
  asValue
} from 'awilix';
import { getSessionUserUseCase } from '~/server/useCases/getSessionUser';
import { signinUseCase } from '~/server/useCases/signin';
import { db } from '~/server/db';
import { H3Event } from 'h3';
import { getServerSession } from '#auth';
import { AsyncReturnType } from '~~/src/utils/types';
import { signupUseCase } from './useCases/signup';

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

export const container = createTypedContainer({
  db: asValue(db),
  getSessionUserUseCase: asFunction(getSessionUserUseCase),
  signinUseCase: asFunction(signinUseCase),
  signupUseCase: asFunction(signupUseCase)
});

export type Container = typeof container;
export type RequestScopedContainer = Container & {
  session: AsyncReturnType<typeof getServerSession>;
};

export const createRequestScope = async (
  event: H3Event
): Promise<RequestScopedContainer> =>
  container.createScope().register({
    session: asValue(await getServerSession(event))
  }) as RequestScopedContainer;
