import { JWT_SECRET, PASSWORD_SALT } from '@/config/env';

import { UserRepository } from '../repositories/user.repository';
import { DrizzleUserRepository } from '../database/drizzle/repositories/drizzle-user.repository';
import { PasswordService } from '../services/password/password.service';
import { BcryptPasswordService } from '../services/password/bcrypt-password.service';
import { V1CreateUserUseCase } from '../use-cases/v1/v1-create-user.use-case';
import { CreateUserController } from '../controllers/create-user.controller';
import { JWTService } from '../services/jwt/jwt.service';
import { JsonwebtokenJWTService } from '../services/jwt/jsonwebtoken-jwt.service';
import { AuthenticateController } from '../controllers/authenticate.controller';
import { V1AuthenticateUseCase } from '../use-cases/v1/v1-authenticate.use-case';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { AuthenticateUseCase } from '../use-cases/authenticate.use-case';
import { V1CreateTokenUseCase } from '../use-cases/v1/v1-create-token.use-case';
import { CreateTokenUseCase } from '../use-cases/create-token.use-case';
import { TokenRepository } from '../repositories/token.repository';
import { DrizzleTokenRepository } from '../database/drizzle/repositories/drizzle-token.repository';
import { LogoutUseCase } from '../use-cases/logout.use-case';
import { V1LogoutUseCase } from '../use-cases/v1/v1-logout.use-case';
import { LogoutController } from '../controllers/logout.controller';
import { AuthenticateMiddleware } from '../middlewares/authenticate.middleare';

// repositories
export const userRepository: UserRepository = new DrizzleUserRepository();
export const tokenRepository: TokenRepository = new DrizzleTokenRepository();

// services
export const passwordService: PasswordService = new BcryptPasswordService({ saltRounds: PASSWORD_SALT });
export const jwtService: JWTService = new JsonwebtokenJWTService({ secret: JWT_SECRET });

// use cases
export const createUserUseCase: CreateUserUseCase = new V1CreateUserUseCase(userRepository, passwordService);
export const createTokenUseCase: CreateTokenUseCase = new V1CreateTokenUseCase(jwtService, tokenRepository);
export const authenticateUseCase: AuthenticateUseCase = new V1AuthenticateUseCase(
  userRepository,
  passwordService,
  createTokenUseCase,
);
export const logoutUseCase: LogoutUseCase = new V1LogoutUseCase(tokenRepository);

// controllers
export const createUserController = new CreateUserController(createUserUseCase);
export const authenticateController = new AuthenticateController(authenticateUseCase);
export const logoutController = new LogoutController(logoutUseCase);

// middlewares
export const authenticateMiddleware = new AuthenticateMiddleware(jwtService, tokenRepository);
