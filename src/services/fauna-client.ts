import * as faunaDB from 'faunadb'

export const client = new faunaDB.Client({
  secret: process.env.FAUNA_SECRET_KEY
})
