import { Router, Request, Response } from 'express';

import { query } from 'faunadb';
import { faunaClient } from '../services/fauna-client';

import { FaunaErrorHandler } from '../errors/fauna-error-handler';
import { InstanceNotFoundError } from '../errors';

import { SuccessResponse } from '../data/protocols/http/http-response';

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

export { router as cyberAccounts };
