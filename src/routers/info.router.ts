import { InfoController } from '../controllers/app/info.controller';
import { Router } from '../http';

export const register = (router: Router) => {
  const infoController = new InfoController();

  router.get('/', infoController.handle);
};
