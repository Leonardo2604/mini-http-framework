import { db } from '@/infra/database/drizzle';
import { Token } from '@/modules/auth/entities/token';
import { TokenRepository } from '@/modules/auth/repositories/token.repository';
import { tokens } from '../schemas';
import { TokenMapper } from '../mappers/token.mapper';
import { eq } from 'drizzle-orm';

export class DrizzleTokenRepository implements TokenRepository {
  async create(token: Token): Promise<void> {
    await db.insert(tokens).values(TokenMapper.toPersistence(token));
  }

  async findById(tokenId: string): Promise<Token | null> {
    const token = await db.query.tokens.findFirst({
      where: eq(tokens.id, tokenId),
    });

    if (!token) {
      return null;
    }

    return TokenMapper.toEntity(token);
  }

  async revoke(token: Token): Promise<void> {
    await db.update(tokens).set({ revokedAt: token.revokedAt }).where(eq(tokens.id, token.id));
  }
}
