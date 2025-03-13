import { BusinessError } from '@/modules/shared/errors/business.error';
import { UserRepository } from '../../repositories/user.repository';
import { BusinessCodeError } from '@/modules/shared/enums/business-code-error';
import { HashService } from '../../../shared/services/password/hash.service';
import { JWT_EXPIRES_IN_SECONDS } from '@/config/env';
import { AuthenticateUseCase, Params, Result } from '../authenticate.use-case';
import { CreateTokenUseCase } from '../create-token.use-case';

export class V1AuthenticateUseCase implements AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly createTokenUseCase: CreateTokenUseCase,
  ) {}

  async execute({ email, password }: Params): Promise<Result> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BusinessError(BusinessCodeError.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const isPasswordCorrect = await this.hashService.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BusinessError(BusinessCodeError.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + JWT_EXPIRES_IN_SECONDS);

    const { token } = await this.createTokenUseCase.execute({ userId: user.id, expiresAt });

    return {
      token,
      expiresAt,
    };
  }
}
