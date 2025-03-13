import { RefreshToken } from '../entities/refresh-token';

export interface RefreshTokenRepository {
  create(refreshToken: RefreshToken): Promise<void>;

  findByUserId(userId: string): Promise<RefreshToken[]>;

  delete(refreshToken: RefreshToken): Promise<void>;
}
