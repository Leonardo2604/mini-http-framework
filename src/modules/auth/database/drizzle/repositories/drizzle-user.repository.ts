import { db } from '@/infra/database/drizzle';

import { User } from '../../../entities/user';
import { UserRepository } from '../../../repositories/user.repository';
import { users } from '../schemas/users';
import { UserMapper } from '../mappers/user.mapper';
import { eq } from 'drizzle-orm';

export class DrizzleUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await db.insert(users).values(UserMapper.toPersistence(user));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return null;
    }

    return UserMapper.toEntity(user);
  }
}
