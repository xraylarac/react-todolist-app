import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.send('cyber accounts');
});

export { router as cyberAccounts };
