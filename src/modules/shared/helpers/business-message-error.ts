import { BusinessCodeError } from '../enums/business-code-error';

export const businessMessageError: Record<BusinessCodeError, string> = {
  [BusinessCodeError.USER_ALREADY_EXISTS]: 'User already exists',
};
