import { UseCase } from '@/modules/shared/interfaces/use-case';
import { Gender } from '../enums/gender';
import { User } from '../entities/user';

export type Params = {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  gender: Gender;
};

export type Result = {
  user: User;
};

export interface CreateUserUseCase extends UseCase<Params, Result> {}
