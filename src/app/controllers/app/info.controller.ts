import { HttpHandler } from '../../../lib/http';

export class InfoController {
  handle: HttpHandler = async (request, response) => {
    response
      .status(200)
      .json({
        name: 'Mini HTTP Framework',
        version: '1.0.0',
      })
      .send();
  };
}
