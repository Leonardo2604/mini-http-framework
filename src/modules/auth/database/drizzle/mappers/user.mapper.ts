import { User as UserDTO, NewUser } from '../dtos/user.dto';
import { User } from '@/modules/auth/entities/user';

export class UserMapper {
  static toEntity(user: UserDTO): User {
    return User.restore({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      gender: user.gender,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }

  static toPersistence(user: User): NewUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      gender: user.gender,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
}
