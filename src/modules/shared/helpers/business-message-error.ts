import { BusinessCodeError } from '../enums/business-code-error';

export const businessMessageError: Record<BusinessCodeError, string> = {
  [BusinessCodeError.USER_ALREADY_EXISTS]: 'User already exists',
  [BusinessCodeError.INCORRECT_EMAIL_OR_PASSWORD]: 'Incorrect email or password',
  [BusinessCodeError.INVALID_REFRESH_TOKEN]: 'Invalid refresh token',
};
