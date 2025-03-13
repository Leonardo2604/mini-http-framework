import { Middleware } from '@/lib/http/middleware';
import { TokenRepository } from '@/modules/auth/repositories/token.repository';
import { JWTService } from '@/modules/auth/services/jwt/jwt.service';

export class AuthenticateMiddleware {
  constructor(
    private readonly jwtService: JWTService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  handle: Middleware = async (req, res, next) => {
    const jwtToken = req.headers.authorization;

    if (!jwtToken) {
      res.status(401).json({ message: 'Token not provided' }).send();
      return;
    }

    let tokenId: string;

    try {
      const { sub } = this.jwtService.verify(jwtToken) as { sub: string };
      tokenId = sub;
    } catch {
      res.status(401).json({ message: 'Invalid token' }).send();
      return;
    }

    const token = await this.tokenRepository.findById(tokenId);

    if (!token || token.isRevoked()) {
      res.status(401).json({ message: 'Invalid token' }).send();
      return;
    }

    req.extra = {
      tokenId: token.id,
      userId: token.userId,
    };

    await next();
  };
}
