import bcrypt from 'bcrypt';
import { PasswordService } from './password.service';

interface BcryptOptions {
  saltRounds: number;
}

export class BcryptPasswordService implements PasswordService {
  private readonly saltRounds: number;

  constructor(options: BcryptOptions) {
    this.saltRounds = options.saltRounds;
  }

  async hash(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, this.saltRounds);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
