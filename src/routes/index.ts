import { Router } from 'express';
import { cyberAccounts } from './cyber-accounts';
import { deposit } from './deposit';

const router = Router();

router.use('/cyber-accounts', cyberAccounts);
router.use('/deposit', deposit);

export { router };
