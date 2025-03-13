import { HttpHandler } from '@/lib/http';
import { RenewTokenUseCase } from '../use-cases/renew-token.use-case';

type Body = {
  userId: string;
  refreshToken: string;
};

export class RenewTokenController {
  constructor(private readonly renewTokenUseCase: RenewTokenUseCase) {}

  handle: HttpHandler = async (req, res) => {
    const { userId, refreshToken } = req.body as Body;

    const result = await this.renewTokenUseCase.execute({ userId, refreshToken });

    res.status(200).json(result).send();
  };
}
