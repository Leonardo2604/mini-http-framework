import uuid from 'uuid';

import { Gender } from '../enums/gender';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  birthday: Date;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

type NewInstance = {
  name: string;
  email: string;
  birthday: Date;
  gender: Gender;
  password: string;
};

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _birthday: Date;
  private _gender: Gender;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  private constructor(user: UserProps) {
    this._id = user.id;
    this._name = user.name;
    this._email = user.email;
    this._birthday = user.birthday;
    this._gender = user.gender;
    this._password = user.password;
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
    this._deletedAt = user.deletedAt;
  }

  static create(user: NewInstance) {
    return new User({
      ...user,
      id: uuid.v7(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }

  static restore(user: UserProps) {
    return new User(user);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get birthday() {
    return this._birthday;
  }

  get gender() {
    return this._gender;
  }

  get password() {
    return this._password;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get deletedAt() {
    return this._deletedAt;
  }

  delete() {
    this._deletedAt = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }
}
