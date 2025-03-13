import { HASH_SALT, JWT_SECRET } from '@/config/env';

import { UserRepository } from '../repositories/user.repository';
import { DrizzleUserRepository } from '../database/drizzle/repositories/drizzle-user.repository';
import { HashService } from '../../shared/services/password/hash.service';
import { BcryptHashService } from '../../shared/services/password/bcrypt-hash.service';
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
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { DrizzleRefreshTokenRepository } from '../database/drizzle/repositories/drizzle-refresh-token.repository';
import { CreateRefreshTokenUseCase } from '../use-cases/create-refresh-token.use-case';
import { V1CreateRefreshTokenUseCase } from '../use-cases/v1/v1-create-refresh-token.use-case';

// repositories
export const userRepository: UserRepository = new DrizzleUserRepository();
export const tokenRepository: TokenRepository = new DrizzleTokenRepository();
export const refreshTokenRepository: RefreshTokenRepository = new DrizzleRefreshTokenRepository();

// services
export const hashService: HashService = new BcryptHashService({ saltRounds: HASH_SALT });
export const jwtService: JWTService = new JsonwebtokenJWTService({ secret: JWT_SECRET });

// use cases
export const createUserUseCase: CreateUserUseCase = new V1CreateUserUseCase(userRepository, hashService);
export const createTokenUseCase: CreateTokenUseCase = new V1CreateTokenUseCase(jwtService, tokenRepository);
export const createRefreshTokenUseCase: CreateRefreshTokenUseCase = new V1CreateRefreshTokenUseCase(
  refreshTokenRepository,
  hashService,
);
export const authenticateUseCase: AuthenticateUseCase = new V1AuthenticateUseCase(
  userRepository,
  hashService,
  createTokenUseCase,
  createRefreshTokenUseCase,
);
export const logoutUseCase: LogoutUseCase = new V1LogoutUseCase(tokenRepository);

// controllers
export const createUserController = new CreateUserController(createUserUseCase);
export const authenticateController = new AuthenticateController(authenticateUseCase);
export const logoutController = new LogoutController(logoutUseCase);

// middlewares
export const authenticateMiddleware = new AuthenticateMiddleware(jwtService, tokenRepository);
