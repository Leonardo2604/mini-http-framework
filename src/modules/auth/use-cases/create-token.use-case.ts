import { UseCase } from '@/modules/shared/interfaces/use-case';

export type Params = {
  userId: string;
  expiresAt: Date;
};

export type Result = {
  token: string;
};

export interface CreateTokenUseCase extends UseCase<Params, Result> {}
