import { router } from '../trpc';
import { imageRouter } from './image';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  image: imageRouter
});

export type AppRouter = typeof appRouter;
