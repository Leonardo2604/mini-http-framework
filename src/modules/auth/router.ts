import { Router } from '@/lib/http';
import { authenticateController, createUserController } from './config/di';

export const register = (router: Router) => {
  router.post('/authenticate', authenticateController.handle);

  router.post('/users', createUserController.handle);
};
