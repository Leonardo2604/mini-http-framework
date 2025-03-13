import { Token } from '../../entities/token';
import { TokenRepository } from '../../repositories/token.repository';
import { JWTService } from '../../services/jwt/jwt.service';
import { CreateTokenUseCase, Params, Result } from '../create-token.use-case';

export class V1CreateTokenUseCase implements CreateTokenUseCase {
  constructor(
    private readonly jwtService: JWTService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async execute({ userId, expiresAt }: Params): Promise<Result> {
    const token = Token.create({ userId, expiresAt });

    await this.tokenRepository.create(token);

    const jwt = this.jwtService.sign({ sub: token.id, exp: Math.floor(expiresAt.getTime() / 1000) });

    return { token: jwt };
  }
}
