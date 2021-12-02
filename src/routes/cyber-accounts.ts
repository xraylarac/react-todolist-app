import { Router, Request, Response } from 'express';

import { FaunaErrorHandler } from '../errors/fauna-error-handler';
import { InvalidDataError } from '../errors';
import { CrudService } from '../services/helpers/crud';
import { validateAccount } from '../services/helpers';

const router = Router();

const faunaErrorHandler = new FaunaErrorHandler();
const crudService = new CrudService();

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await crudService.get(id);

    return response.status(200).json(result);
  } catch (error) {
    const faunaError = faunaErrorHandler.handle(error);

    return response.status(faunaError.status).json(faunaError);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const isValidAccount = validateAccount(body);

    if (isValidAccount) {
      const result = await crudService.create(body);

      return response.status(200).json(result);
    } else {
      return new InvalidDataError();
    }
  } catch (error) {
    const faunaError = faunaErrorHandler.handle(error);

    return response.status(faunaError.status).json(faunaError);
  }
});

router.put('/:id', async (request: Request, response: Response) => {
  try {
    const { body, params } = request;
    const { id } = params;

    if (body) {
      const result = await crudService.update(id, body);

      return response.status(200).json(result);
    } else {
      return new InvalidDataError();
    }
  } catch (error) {
    const faunaError = faunaErrorHandler.handle(error);

    return response.status(faunaError.status).json(faunaError);
  }
});

router.put('/delete/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (id) {
      const result = await crudService.delete(id);

      return response.status(200).json(result);
    } else {
      return new InvalidDataError();
    }
  } catch (error) {
    const faunaError = faunaErrorHandler.handle(error);

    return response.status(faunaError.status).json(faunaError);
  }
});

export { router as cyberAccounts };
