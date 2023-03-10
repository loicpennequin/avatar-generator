import { inferAsyncReturnType } from '@trpc/server';
import { H3Event } from 'h3';
import { createRequestScope } from '~/server/container';

export const createContext = async (event: H3Event) => {
  return await createRequestScope(event);
};
export type Context = inferAsyncReturnType<typeof createContext>;
