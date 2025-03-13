import { Token } from '../entities/token';

export interface TokenRepository {
  create(token: Token): Promise<void>;

  findById(tokenId: string): Promise<Token | null>;
}
