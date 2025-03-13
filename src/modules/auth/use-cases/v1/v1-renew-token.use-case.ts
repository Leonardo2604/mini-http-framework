import { HashService } from '@/modules/shared/services/password/hash.service';
import { RefreshTokenRepository } from '../../repositories/refresh-token.repository';
import { CreateTokenUseCase } from '../create-token.use-case';
import { RenewTokenUseCase, Params, Result } from '../renew-token.use-case';
import { BusinessError } from '@/modules/shared/errors/business.error';
import { BusinessCodeError } from '@/modules/shared/enums/business-code-error';
import { REFRESH_TOKEN_EXPIRES_IN_DAYS, TOKEN_EXPIRES_IN_SECONDS } from '@/config/env';
import { CreateRefreshTokenUseCase } from '../create-refresh-token.use-case';

export class V1RenewTokenUseCase implements RenewTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly hashService: HashService,
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase,
  ) {}

  async execute({ userId, refreshToken }: Params): Promise<Result> {
    const refreshTokenEntity = await this.validateRefreshToken(userId, refreshToken);

    if (!refreshTokenEntity || refreshTokenEntity.isExpired()) {
      throw new BusinessError(BusinessCodeError.INVALID_REFRESH_TOKEN);
    }

    const tokenExpiresAt = new Date();
    tokenExpiresAt.setSeconds(tokenExpiresAt.getSeconds() + TOKEN_EXPIRES_IN_SECONDS);

    const { token } = await this.createTokenUseCase.execute({
      userId: refreshTokenEntity.userId,
      expiresAt: tokenExpiresAt,
    });

    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

    const { token: newRefreshToken } = await this.createRefreshTokenUseCase.execute({
      userId,
      expiresAt: refreshTokenExpiresAt,
    });

    await this.refreshTokenRepository.delete(refreshTokenEntity);

    return {
      token,
      refreshToken: newRefreshToken,
      expiresAt: tokenExpiresAt,
    };
  }

  private async validateRefreshToken(userId: string, refreshToken: string) {
    const tokens = await this.refreshTokenRepository.findByUserId(userId);

    for (const token of tokens) {
      const isTokenValid = await this.hashService.compare(refreshToken, token.tokenHash);

      if (isTokenValid) {
        return token;
      }
    }

    return null;
  }
}
