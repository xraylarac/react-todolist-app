import { Router, Request, Response } from 'express';

import { Update, query } from 'faunadb';

import { makeSuccessResponse } from '../services/helpers';
import { QueryResponse } from '../services/fauna/fauna-query-response';
import { faunaClient } from '../services/fauna/fauna-client';

import { FaunaErrorHandler } from '../errors/fauna-error-handler';
import { InstanceNotFoundError, InvalidDataError } from '../errors';

import { CyberAccount } from '../usecases/create-account/create-account-dto';

const { Get, Ref, Collection } = query;

const router = Router();

const faunaErrorHandler = new FaunaErrorHandler();

/* Nome da collection no FaunaDB - Não deletar */
const collection = 'cyberAccounts';

router.put('/:id', async (request: Request, response: Response) => {
  try {
    const { body, params } = request;
    const { id } = params;

    if (id || body.withdraw) {
      let { withdraw } = body;

      const account: QueryResponse = await faunaClient.query(Get(Ref(Collection(collection), id)));

      if (!account.data) {
        return new InstanceNotFoundError();
      }

      const {
        balance: currentBalance,
        withdrawals,
        deleted,
        accountType
      } = account.data as CyberAccount;

      if (deleted) {
        return new InstanceNotFoundError();
      }

      const withdrawalFee = accountType === 'checking-account' ? 0.3 : 0.6;
      withdraw += withdrawalFee;

      if (withdraw > currentBalance) {
        return response
          .status(400)
          .json({ status: 400, message: 'Saldo insuficiente para efetuar saque.' });
      }

      let data = { balance: currentBalance - withdraw, withdrawals: [] };

      if (!withdrawals) {
        data = { ...data, withdrawals: new Array([withdraw, Date.now()]) };
      } else {
        withdrawals.push([withdraw, Date.now()]);

        data = { ...data, withdrawals };
      }

      const payload: QueryResponse = await faunaClient.query(
        Update(Ref(Collection(collection), id), { data: { ...data } })
      );

      const result = makeSuccessResponse('Saque efetuado!', payload.data);

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
