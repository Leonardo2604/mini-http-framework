import { HttpHandler } from '../../http';

export class GetUsersController {
  handle: HttpHandler = async (request, response) => {
    response
      .status(200)
      .json({
        users: [
          {
            id: 1,
            name: 'John Doe',
          },
          {
            id: 2,
            name: 'Jane Doe',
          },
        ],
      })
      .send();
  };
}
