import { PASSWORD_SALT } from '@/config/env';

import { UserRepository } from '../repositories/user.repository';
import { DrizzleUserRepository } from '../database/drizzle/repositories/drizzle-user.repository';
import { PasswordService } from '../services/password/password.service';
import { BcryptPasswordService } from '../services/password/bcrypt-password.service';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { CreateUserController } from '../controllers/create-user.controller';

// repositories
export const userRepository: UserRepository = new DrizzleUserRepository();

// services
export const passwordService: PasswordService = new BcryptPasswordService({ saltRounds: PASSWORD_SALT });

// use cases
export const createUserUseCase = new CreateUserUseCase(userRepository, passwordService);

// controllers
export const createUserController = new CreateUserController(createUserUseCase);
