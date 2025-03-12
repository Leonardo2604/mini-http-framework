import { User as UserDTO } from '../dtos/user.dto';
import { CreateUser } from '../dtos/create-user.dto';
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

  static toPersistence(user: User): CreateUser {
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
