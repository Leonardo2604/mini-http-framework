import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { RefreshTokenRepository } from '@/modules/auth/repositories/refresh-token.repository';
import { RefreshToken } from '@/modules/auth/entities/refresh-token';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';
import { refreshTokens } from '../schemas';

export class DrizzleRefreshTokenRepository implements RefreshTokenRepository {
  async create(refreshToken: RefreshToken): Promise<void> {
    await db.insert(refreshTokens).values(RefreshTokenMapper.toPersistence(refreshToken));
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    const tokens = await db.query.refreshTokens.findMany({
      where: eq(refreshTokens.userId, userId),
    });

    return tokens.map(RefreshTokenMapper.toEntity);
  }

  async delete(refreshToken: RefreshToken): Promise<void> {
    await db.delete(refreshTokens).where(eq(refreshTokens.id, refreshToken.id));
  }
}
