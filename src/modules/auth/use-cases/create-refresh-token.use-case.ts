import { UseCase } from '@/modules/shared/interfaces/use-case';

export type Params = {
  userId: string;
  expiresAt: Date;
};

export type Result = {
  token: string;
};

export interface CreateRefreshTokenUseCase extends UseCase<Params, Result> {}
