import { Router, Request, Response } from 'express';

import { FaunaErrorHandler } from '../errors/fauna-error-handler';
import { InvalidDataError } from '../errors';

import { CashMachineService } from '../services/cash-machine';

const router = Router();

const cashMachine = new CashMachineService();
const faunaErrorHandler = new FaunaErrorHandler();

router.put('/:id', async (request: Request, response: Response) => {
  try {
    const { body, params } = request;
    const { id } = params;

    if (id || body.withdraw) {
      const result = await cashMachine.withdraw(id, body.withdraw);

      return response.status(200).json(result);
    } else {
      return new InvalidDataError();
    }
  } catch (error) {
    const faunaError = faunaErrorHandler.handle(error);

    return response.status(faunaError.status).json(faunaError);
  }
});

export { router as withdraw };
