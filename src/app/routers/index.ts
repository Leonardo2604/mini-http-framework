import { Router } from '../../lib/http';

import * as Info from './info.router';
import * as User from './user.router';

const router = new Router();

Info.register(router);
User.register(router);

export { router };
