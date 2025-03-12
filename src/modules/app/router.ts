import { Router } from '@/lib/http';
import { InfoController } from './controllers/info.controller';

export const register = (router: Router) => {
  const infoController = new InfoController();

  router.get('/', infoController.handle);
};
