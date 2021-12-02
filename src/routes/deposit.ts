import { Router, Request, Response } from 'express';

import { Update, query } from 'faunadb';

import { faunaClient } from '../services/fauna/fauna-client';
import { makeSuccessResponse } from '../services/helpers';

import { FaunaErrorHandler } from '../errors/fauna-error-handler';
import { InstanceNotFoundError, InvalidDataError } from '../errors';

import { CyberAccount } from '../usecases/create-account/create-account-dto';

const { Get, Ref, Collection } = query;

const router = Router();

const faunaErrorHandler = new FaunaErrorHandler();

interface QueryResponse {
  account: object;
  ts: number;
  data: object;
}

/* Nome da collection no FaunaDB - Não deletar */
const collection = 'cyberAccounts';

router.put('/:id', async (request: Request, response: Response) => {
  try {
    const { body, params } = request;
    const { id } = params;

    if (id || body.deposit) {
      const { deposit } = body;

      const account: QueryResponse = await faunaClient.query(Get(Ref(Collection(collection), id)));

      if (!account.data) {
        return new InstanceNotFoundError();
      }

      const { balance: currentBalance, deposits, deleted } = account.data as CyberAccount;

      if (deleted) {
        return new InstanceNotFoundError();
      }

      let data = { balance: deposit + currentBalance, deposits: [] };

      if (!deposits) {
        data = { ...data, deposits: new Array([deposit, Date.now()]) };
      } else {
        deposits.push([deposit, Date.now()]);

        data = { ...data, deposits };
      }

      const payload: QueryResponse = await faunaClient.query(
        Update(Ref(Collection(collection), id), { data: { ...data } })
      );

      const result = makeSuccessResponse('Depósito efetuado!', payload.data);

      return response.status(200).json(result);
    } else {
      return new InvalidDataError();
    }
  } catch (error) {
    const faunaError = faunaErrorHandler.handle(error);

    return response.status(faunaError.status).json(faunaError);
  }
});

export { router as deposit };
