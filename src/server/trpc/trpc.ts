import { TRPCError, initTRPC, inferAsyncReturnType } from '@trpc/server';
import superjson from 'superjson';
import chalk from 'chalk';
import { H3Event } from 'h3';
import { createRequestScope } from '~/server/container';

const createContext = async (event: H3Event) => {
  return await createRequestScope(event);
};

const trpcLogger = (...messages: string[]) =>
  console.log(chalk.blue('[ TRPC ]'), ' - ', ...messages);

type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create({
  transformer: superjson
});

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

const loggerMiddleware = t.middleware(async ({ path, next }) => {
  trpcLogger(`${path}`);

  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  trpcLogger(`${path} - END : ${durationMs}ms`);

  return result;
});

export const procedure = t.procedure.use(loggerMiddleware);
export const authenticatedProcedure = t.procedure
  .use(loggerMiddleware)
  .use(authMiddleware);
export const router = t.router;
