import { HttpHandler } from '@/lib/http';
import { AuthenticateUseCase } from '../use-cases/authenticate.use-case';

type Body = {
  email: string;
  password: string;
};

export class AuthenticateController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  handle: HttpHandler = async (req, res) => {
    const { email, password } = req.body as Body;

    const result = await this.authenticateUseCase.execute({ email, password });

    res.json(result).send();
  };
}
