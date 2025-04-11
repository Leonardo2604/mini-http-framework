import { Router } from '@/lib/http';
import * as AppRouter from '@/modules/app/router';
import * as AuthRouter from '@/modules/auth/router';

const router = new Router();

AppRouter.register(router);
AuthRouter.register(router);

export { router };
