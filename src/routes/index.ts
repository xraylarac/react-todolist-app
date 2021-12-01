import { Router } from 'express';
import { cyberAccounts } from './cyber-accounts';

const router = Router();

router.use('/cyber-accounts', cyberAccounts);

export { router };
