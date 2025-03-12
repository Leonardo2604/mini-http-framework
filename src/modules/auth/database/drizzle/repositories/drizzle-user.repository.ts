import { User } from '../../../entities/user';
import { UserRepository } from '../../../repositories/user.repository';

export class DrizzleUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return null;
  }
}
