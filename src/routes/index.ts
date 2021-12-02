import { Router } from 'express';

import { cyberAccounts } from './cyber-accounts';
import { deposit } from './deposit';
import { withdraw } from './withdraw';

const router = Router();

router.use('/cyber-accounts', cyberAccounts);
router.use('/deposit', deposit);
router.use('/withdraw', withdraw);

export { router };
