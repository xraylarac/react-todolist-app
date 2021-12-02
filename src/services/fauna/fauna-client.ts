import * as faunaDB from 'faunadb';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new faunaDB.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
  domain: 'db.us.fauna.com',
  scheme: 'https'
});

export { client as faunaClient };
