import { FindUserController } from '../controllers/users/find-user.controller';
import { GetUsersController } from '../controllers/users/get-users.controller';
import { Router } from '../http';

export const register = (router: Router) => {
  const getUsersController = new GetUsersController();
  const findUserController = new FindUserController();

  router.get('/users', getUsersController.handle);
  router.get('/users/:userId', findUserController.handle);
};
