import { UseCase } from '@/modules/shared/interfaces/use-case';

export type Params = {
  email: string;
  password: string;
};

export type Result = {
  token: string;
  expiresAt: Date;
};

export interface AuthenticateUseCase extends UseCase<Params, Result> {}
