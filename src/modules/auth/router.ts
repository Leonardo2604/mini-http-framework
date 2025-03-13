import { Router } from '@/lib/http';
import { authenticateController, authenticateMiddleware, createUserController, logoutController } from './config/di';

export const register = (router: Router) => {
  router.post('/authenticate', authenticateController.handle);
  router.post('/logout', logoutController.handle, {
    middlewares: [authenticateMiddleware.handle],
  });

  router.post('/users', createUserController.handle);
};
