import { Token as TokenDTO, NewToken } from '../dtos/token.dto';
import { Token } from '@/modules/auth/entities/token';

export class TokenMapper {
  static toEntity(token: TokenDTO): Token {
    return Token.restore({
      id: token.id,
      userId: token.userId,
      revokedAt: token.revokedAt,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
    });
  }

  static toPersistence(token: Token): NewToken {
    return {
      id: token.id,
      userId: token.userId,
      revokedAt: token.revokedAt,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
    };
  }
}
