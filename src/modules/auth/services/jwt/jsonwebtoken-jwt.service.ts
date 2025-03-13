import { JWTService, SignOptions } from './jwt.service';
import * as jwt from 'jsonwebtoken';

type JsonwebtokenOptions = {
  secret: string;
};

export class JsonwebtokenJWTService implements JWTService {
  private readonly _secret: string;

  constructor(options: JsonwebtokenOptions) {
    this._secret = options.secret;
  }

  sign(payload: Record<string, unknown>, options?: SignOptions): string {
    return jwt.sign(payload, this._secret, options);
  }

  verify(token: string): Record<string, unknown> {
    return jwt.verify(token, this._secret) as Record<string, unknown>;
  }

  decode(token: string): Record<string, unknown> {
    return jwt.decode(token) as Record<string, unknown>;
  }
}
