import { BusinessCodeError } from '@/modules/shared/enums/business-code-error';
import { User } from '../../entities/user';
import { UserRepository } from '../../repositories/user.repository';
import { BusinessError } from '@/modules/shared/errors/business.error';
import { HashService } from '../../../shared/services/password/hash.service';
import { CreateUserUseCase, Params, Result } from '../create-user.use-case';

export class V1CreateUserUseCase implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: HashService,
  ) {}

  async execute({ name, email, password, birthday, gender }: Params): Promise<Result> {
    const exists = await this.userRepository.findByEmail(email);

    if (exists) {
      throw new BusinessError(BusinessCodeError.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this.passwordService.hash(password);

    const user = User.create({ name, email, password: hashedPassword, birthday, gender });

    await this.userRepository.create(user);

    return { user };
  }
}
