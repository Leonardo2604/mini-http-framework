import { BusinessCodeError } from '@/modules/shared/enums/business-code-error';
import { User } from '../entities/user';
import { Gender } from '../enums/gender';
import { UserRepository } from '../repositories/user.repository';
import { BusinessError } from '@/modules/shared/errors/business.error';
import { PasswordService } from '../services/password/password.service';

type Params = {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  gender: Gender;
};

type Result = {
  user: User;
};

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute({ name, email, password, birthday, gender }: Params): Promise<Result> {
    const exists = await this.userRepository.findByEmail(email);

    if (exists) {
      throw new BusinessError(BusinessCodeError.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this.passwordService.hash(password);

    const user = User.create({ name, email, password: hashedPassword, birthday, gender });

    const created = await this.userRepository.create(user);

    return { user: created };
  }
}
