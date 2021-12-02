import { Collection, Create, Get, Ref, Update } from 'faunadb';
import { uuid } from 'uuidv4';

import { faunaClient } from '../fauna/fauna-client';
import { QueryResponse } from '../fauna/fauna-query-response';

import { makeSuccessResponse } from '.';

import { SuccessResponse } from '../../data/protocols/http/http-response';
import { CyberAccount } from '../../usecases/create-account/create-account-dto';

interface Crud {
  get: (id: string) => Promise<SuccessResponse>;
  create: (body: CyberAccount) => Promise<SuccessResponse>;
  update: (id: string, body: CyberAccount) => Promise<SuccessResponse>;
  delete: (id: string) => Promise<SuccessResponse>;
}

export class CrudService implements Crud {
  private readonly collection = 'cyberAccounts';

  async get(id: string): Promise<SuccessResponse> {
    const payload: QueryResponse = await faunaClient.query(
      Get(Ref(Collection(this.collection), id))
    );

    const result = makeSuccessResponse('Usuário encontrado!', payload.data);

    return result;
  }

  async create(body: CyberAccount): Promise<SuccessResponse> {
    const data = { ...body, cyberId: uuid(), createdAt: Date.now(), balance: 0 };

    const payload: QueryResponse = await faunaClient.query(
      Create(Collection(this.collection), { data: { ...data } })
    );

    const result = makeSuccessResponse('Usuário criado!', payload.data);

    return result;
  }

  async update(id: string, body: CyberAccount): Promise<SuccessResponse> {
    const data = { ...body, updatedAt: Date.now() };

    const payload: QueryResponse = await faunaClient.query(
      Update(Ref(Collection(this.collection), id), { data: { ...data } })
    );

    const result = makeSuccessResponse('Usuário atualizado!', payload.data);

    return result;
  }

  async delete(id: string): Promise<SuccessResponse> {
    const data = { deleted: true, deletedAt: Date.now() };

    const payload: QueryResponse = await faunaClient.query(
      Update(Ref(Collection(this.collection), id), { data: { ...data } })
    );

    const result = makeSuccessResponse('Usuário deletado!', payload.data);

    return result;
  }
}
