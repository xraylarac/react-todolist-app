import { Router, Request, Response } from 'express';

import { query } from 'faunadb';
import { faunaClient } from '../services/fauna-client';

const { Get, Ref, Collection } = query;

const router = Router();

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const account = await faunaClient.query(Get(Ref(Collection('cyberAccounts'), id)));

    if (account) {
      response.json({ account });
    } else {
      response.json({});
    }
  } catch (error) {
    response.json({ error });
  }
});

export { router as cyberAccounts };
