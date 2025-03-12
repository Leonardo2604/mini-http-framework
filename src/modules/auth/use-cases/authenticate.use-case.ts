import { BusinessError } from '@/modules/shared/errors/business.error';
import { UserRepository } from '../repositories/user.repository';
import { BusinessCodeError } from '@/modules/shared/enums/business-code-error';
import { PasswordService } from '../services/password/password.service';
import { JWTService } from '../services/jwt/jwt.service';
import { JWT_EXPIRES_IN_SECONDS } from '@/config/env';

type Params = {
  email: string;
  password: string;
};

type Result = {
  token: string;
  expiresIn: number;
};

export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JWTService,
  ) {}

  async execute({ email, password }: Params): Promise<Result> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BusinessError(BusinessCodeError.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const isPasswordCorrect = await this.passwordService.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BusinessError(BusinessCodeError.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const token = this.jwtService.sign({ sub: user.id }, { expiresIn: JWT_EXPIRES_IN_SECONDS });

    return {
      token,
      expiresIn: JWT_EXPIRES_IN_SECONDS,
    };
  }
}
