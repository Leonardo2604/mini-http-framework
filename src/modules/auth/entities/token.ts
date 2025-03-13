import * as uuid from 'uuid';

export type TokenProps = {
  id: string;
  userId: string;
  revokedAt: Date | null;
  expiresAt: Date;
  createdAt: Date;
};

type NewInstance = {
  userId: string;
  expiresAt: Date;
};

export class Token {
  private _id: string;
  private _userId: string;
  private _revokedAt: Date | null;
  private _expiresAt: Date;
  private _createdAt: Date;

  private constructor(token: TokenProps) {
    this._id = token.id;
    this._userId = token.userId;
    this._revokedAt = token.revokedAt;
    this._expiresAt = token.expiresAt;
    this._createdAt = token.createdAt;
  }

  static create(token: NewInstance) {
    return new Token({
      ...token,
      id: uuid.v7(),
      createdAt: new Date(),
      revokedAt: null,
    });
  }

  static restore(token: TokenProps) {
    return new Token(token);
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get expiresAt() {
    return this._expiresAt;
  }

  get revokedAt() {
    return this._revokedAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  revoke() {
    this._revokedAt = new Date();
  }

  isRevoked() {
    return !!this._revokedAt;
  }

  toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      revokedAt: this._revokedAt,
      expiresAt: this._expiresAt,
      createdAt: this._createdAt,
    };
  }
}
