import { BusinessCodeError } from '../enums/business-code-error';
import { businessMessageError } from '../helpers/business-message-error';
import { AppError } from './app.error';

export class BusinessError extends AppError {
  private _code: BusinessCodeError;

  constructor(code: BusinessCodeError) {
    super(businessMessageError[code]);
    this._code = code;
    this.name = 'BusinessError';
  }

  get code(): BusinessCodeError {
    return this._code;
  }
}
