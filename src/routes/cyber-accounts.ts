import { Router, Request, Response } from 'express';

import { uuid } from 'uuidv4';
import { Create, query } from 'faunadb';

import { faunaClient } from '../services/fauna-client';

import { FaunaErrorHandler } from '../errors/fauna-error-handler';
import { InvalidDataError } from '../errors';

import { SuccessResponse } from '../data/protocols/http/http-response';

import { CyberAccount } from '../usecases/create-account/create-account-dto';

const { Get, Ref, Collection } = query;

const router = Router();

const faunaErrorHandler = new FaunaErrorHandler();

interface QueryResponse {
  account: object;
  ts: number;
  data: object;
}

function makeSuccessResponse(message: string, payload: object): SuccessResponse {
  return {
    status: 200,
    message,
    payload
  };
}

function validateAccount(body: CyberAccount): boolean {
  if (body.cyberEmail && body.name && body.accountType) {
    return true;
  } else {
    return false;
  }
}

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const payload: QueryResponse = await faunaClient.query(
      Get(Ref(Collection('cyberAccounts'), id))
    );

    const result = makeSuccessResponse('Usuário encontrado!', payload.data);

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
      const data = { ...body, cyberId: uuid(), createdAt: Date.now(), balance: 0 };

      const payload: QueryResponse = await faunaClient.query(
        Create(Collection('cyberAccounts'), { data: { ...data } })
      );

      const result = makeSuccessResponse('Usuário criado!', payload.data);

      return response.status(200).json(result);
    } else {
      throw new InvalidDataError();
    }
  } catch (error) {
    const faunaError = faunaErrorHandler.handle(error);

    return response.status(faunaError.status).json(faunaError);
  }
});

export { router as cyberAccounts };
