import { UseCase } from '@/modules/shared/interfaces/use-case';

export type Params = {
  tokenId: string;
};

export type Result = void;

export interface LogoutUseCase extends UseCase<Params, Result> {}
