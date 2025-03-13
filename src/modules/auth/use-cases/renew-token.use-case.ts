import { UseCase } from '@/modules/shared/interfaces/use-case';

export type Params = {
  userId: string;
  refreshToken: string;
};

export type Result = {
  token: string;
  refreshToken: string;
  expiresAt: Date;
};

export interface RenewTokenUseCase extends UseCase<Params, Result> {}
