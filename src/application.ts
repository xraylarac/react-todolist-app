export {};

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

import { router } from './routes';

dotenv.config();

const application = express();

application.use(bodyParser.text());
application.use(express.json());
application.use(express.urlencoded({ extended: false }));
application.use(cors());
application.use(router);

application.set('port', process.env.APP_PORT || 5000);

export { application };
