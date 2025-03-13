import { Router } from '@/lib/http';
import {
  authenticateController,
  authenticateMiddleware,
  createUserController,
  logoutController,
  renewTokenController,
} from './config/di';

export const register = (router: Router) => {
  router.post('/auth/login', authenticateController.handle);

  router.post('/auth/refresh', renewTokenController.handle);

  router.post('/auth/logout', logoutController.handle, {
    middlewares: [authenticateMiddleware.handle],
  });

  router.post('/users', createUserController.handle, {
    middlewares: [authenticateMiddleware.handle],
  });
};
