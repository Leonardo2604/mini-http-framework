import { NotFoundError } from '@/modules/shared/errors/not-found.error';
import { TokenRepository } from '../../repositories/token.repository';
import { LogoutUseCase, Params, Result } from '../logout.use-case';

export class V1LogoutUseCase implements LogoutUseCase {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute({ tokenId }: Params): Promise<Result> {
    const token = await this.tokenRepository.findById(tokenId);

    if (!token) {
      throw new NotFoundError('Token not found');
    }

    token.revoke();

    await this.tokenRepository.revoke(token);
  }
}
