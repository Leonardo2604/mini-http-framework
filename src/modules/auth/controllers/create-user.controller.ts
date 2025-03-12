import { HttpHandler } from '@/lib/http';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';

type Body = {
  name: string;
  email: string;
  password: string;
  gender: number;
  birthday: string;
};

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  handle: HttpHandler = async (req, res) => {
    const { name, email, password, gender, birthday } = req.body as Body;

    const { user } = await this.createUserUseCase.execute({
      name,
      email,
      password,
      gender,
      birthday: new Date(birthday),
    });

    res.json(user).send();
  };
}
