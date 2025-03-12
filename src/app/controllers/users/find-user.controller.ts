import { HttpHandler } from '../../../lib/http';

export class FindUserController {
  handle: HttpHandler = async (request, response) => {
    response
      .json({
        user: {
          id: 1,
          name: 'John Doe',
        },
      })
      .send();
  };
}
