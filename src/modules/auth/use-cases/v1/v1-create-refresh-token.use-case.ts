import * as uuid from 'uuid';

import { HashService } from '@/modules/shared/services/password/hash.service';
import { RefreshTokenRepository } from '../../repositories/refresh-token.repository';
import { CreateRefreshTokenUseCase, Params, Result } from '../create-refresh-token.use-case';
import { RefreshToken } from '../../entities/refresh-token';

export class V1CreateRefreshTokenUseCase implements CreateRefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly hashService: HashService,
  ) {}

  async execute({ userId, expiresAt }: Params): Promise<Result> {
    const token = uuid.v4();

    const hashedToken = await this.hashService.hash(token);

    const refreshToken = RefreshToken.create({ userId, tokenHash: hashedToken, expiresAt });

    await this.refreshTokenRepository.create(refreshToken);

    return { token };
  }
}
