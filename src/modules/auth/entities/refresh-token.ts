import * as uuid from 'uuid';

export type RefreshTokenProps = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

type NewInstance = {
  userId: string;
  expiresAt: Date;
  tokenHash: string;
};

export class RefreshToken {
  private _id: string;
  private _userId: string;
  private _tokenHash: string;
  private _expiresAt: Date;
  private _createdAt: Date;

  private constructor(token: RefreshTokenProps) {
    this._id = token.id;
    this._userId = token.userId;
    this._tokenHash = token.tokenHash;
    this._expiresAt = token.expiresAt;
    this._createdAt = token.createdAt;
  }

  static create(token: NewInstance) {
    return new RefreshToken({
      ...token,
      id: uuid.v7(),
      createdAt: new Date(),
    });
  }

  static restore(refreshToken: RefreshTokenProps) {
    return new RefreshToken(refreshToken);
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

  get tokenHash() {
    return this._tokenHash;
  }

  get createdAt() {
    return this._createdAt;
  }

  isExpired() {
    return this._expiresAt < new Date();
  }

  toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      expiresAt: this._expiresAt,
      createdAt: this._createdAt,
    };
  }
}
