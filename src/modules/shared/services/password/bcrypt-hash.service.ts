import bcrypt from 'bcrypt';
import { HashService } from './hash.service';

interface BcryptOptions {
  saltRounds: number;
}

export class BcryptHashService implements HashService {
  private readonly saltRounds: number;

  constructor(options: BcryptOptions) {
    this.saltRounds = options.saltRounds;
  }

  async hash(plain: string): Promise<string> {
    return await bcrypt.hash(plain, this.saltRounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }
}
