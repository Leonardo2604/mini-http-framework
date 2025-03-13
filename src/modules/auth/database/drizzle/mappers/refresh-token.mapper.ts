import { RefreshToken as RefreshTokenDTO, NewRefreshToken } from '../dtos/refresh-token.dto';
import { RefreshToken } from '@/modules/auth/entities/refresh-token';

export class RefreshTokenMapper {
  static toEntity(token: RefreshTokenDTO): RefreshToken {
    return RefreshToken.restore({
      id: token.id,
      userId: token.userId,
      tokenHash: token.tokenHash,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
    });
  }

  static toPersistence(token: RefreshToken): NewRefreshToken {
    return {
      id: token.id,
      userId: token.userId,
      tokenHash: token.tokenHash,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
    };
  }
}
