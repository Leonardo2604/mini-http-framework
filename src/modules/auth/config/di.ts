import { JWT_SECRET, PASSWORD_SALT } from '@/config/env';

import { UserRepository } from '../repositories/user.repository';
import { DrizzleUserRepository } from '../database/drizzle/repositories/drizzle-user.repository';
import { PasswordService } from '../services/password/password.service';
import { BcryptPasswordService } from '../services/password/bcrypt-password.service';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { CreateUserController } from '../controllers/create-user.controller';
import { JWTService } from '../services/jwt/jwt.service';
import { JsonwebtokenJWTService } from '../services/jwt/jsonwebtoken-jwt.service';
import { AuthenticateController } from '../controllers/authenticate.controller';
import { AuthenticateUseCase } from '../use-cases/authenticate.use-case';

// repositories
export const userRepository: UserRepository = new DrizzleUserRepository();

// services
export const passwordService: PasswordService = new BcryptPasswordService({ saltRounds: PASSWORD_SALT });
export const jwtService: JWTService = new JsonwebtokenJWTService({ secret: JWT_SECRET });

// use cases
export const createUserUseCase = new CreateUserUseCase(userRepository, passwordService);
export const authenticateUseCase = new AuthenticateUseCase(userRepository, passwordService, jwtService);

// controllers
export const createUserController = new CreateUserController(createUserUseCase);
export const authenticateController = new AuthenticateController(authenticateUseCase);
