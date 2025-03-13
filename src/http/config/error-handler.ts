import { ErrorHandlerFunction } from '@/lib/http/error-handler-function';
import { AppError } from '@/modules/shared/errors/app.error';
import { BusinessError } from '@/modules/shared/errors/business.error';
import { inProduction } from '@/config/app';
import { NotFoundError } from '@/modules/shared/errors/not-found.error';

export const errorHandler: ErrorHandlerFunction = async (_, response, error) => {
  if (!inProduction) {
    console.error(error);
  }

  if (error instanceof AppError) {
    if (error instanceof BusinessError) {
      response.status(400).json({ message: error.message }).send();
      return;
    }

    if (error instanceof NotFoundError) {
      response.status(404).json({ message: error.message }).send();
      return;
    }
  }

  response.status(500).json({ message: 'Internal Server Error' }).send();
};
