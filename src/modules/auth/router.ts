import { Router } from '@/lib/http';
import { createUserController } from './config/di';

export const register = (router: Router) => {
  router.post('/users', createUserController.handle);
};
