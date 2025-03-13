import { HttpHandler } from '@/lib/http';
import { LogoutUseCase } from '../use-cases/logout.use-case';

export class LogoutController {
  constructor(private readonly logoutUseCase: LogoutUseCase) {}

  handle: HttpHandler = async (req, res) => {
    const { tokenId } = req.extra as { tokenId: string };

    await this.logoutUseCase.execute({ tokenId });

    res.status(204).send();
  };
}
