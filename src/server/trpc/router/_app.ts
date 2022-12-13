import { router } from '../trpc';
import { adminRouer } from './admin';
import { authRouter } from './auth';
import { lawyerRouter } from './lawyer';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  admin: adminRouer,
  auth: authRouter,
  lawyer: lawyerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
