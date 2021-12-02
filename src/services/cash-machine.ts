import { Collection, Get, Ref, Update } from 'faunadb';

import { SuccessResponse } from '../data/protocols/http/http-response';

import { InstanceNotFoundError, InsufficientBalanceError } from '../errors';

import { faunaClient } from './fauna/fauna-client';
import { QueryResponse } from './fauna/fauna-query-response';

import { CyberAccount } from '../usecases/create-account/create-account-dto';

import { makeSuccessResponse } from './helpers';

interface CashMachine {
  deposit: (id: string, deposit: number) => Promise<SuccessResponse | Error>;
  withdraw: (id: string, withdraw: number) => Promise<SuccessResponse | Error>;
}

export class CashMachineService implements CashMachine {
  private readonly collection = 'cyberAccounts';

  async deposit(id: string, deposit: number): Promise<SuccessResponse | Error> {
    const account: QueryResponse = await faunaClient.query(
      Get(Ref(Collection(this.collection), id))
    );

    if (!account.data) {
      return new InstanceNotFoundError();
    }

    const { balance: currentBalance, deposits, deleted } = account.data as CyberAccount;

    if (deleted) {
      return new InstanceNotFoundError();
    }

    let data = { balance: deposit + currentBalance, deposits: [] };

    if (!deposits) {
      data = { ...data, deposits: new Array([deposit, Date.now()]) };
    } else {
      deposits.push([deposit, Date.now()]);

      data = { ...data, deposits };
    }

    const payload: QueryResponse = await faunaClient.query(
      Update(Ref(Collection(this.collection), id), { data: { ...data } })
    );

    const result = makeSuccessResponse('Depósito efetuado!', payload.data);

    return result;
  }

  async withdraw(id: string, withdraw: number): Promise<SuccessResponse | Error> {
    const account: QueryResponse = await faunaClient.query(
      Get(Ref(Collection(this.collection), id))
    );

    if (!account.data) {
      return new InstanceNotFoundError();
    }

    const {
      balance: currentBalance,
      withdrawals,
      deleted,
      accountType
    } = account.data as CyberAccount;

    if (deleted) {
      return new InstanceNotFoundError();
    }

    const withdrawalFee = accountType === 'checking-account' ? 0.3 : 0.6;
    withdraw += withdrawalFee;

    if (withdraw > currentBalance) {
      return new InsufficientBalanceError();
    }

    let data = { balance: currentBalance - withdraw, withdrawals: [] };

    if (!withdrawals) {
      data = { ...data, withdrawals: new Array([withdraw, Date.now()]) };
    } else {
      withdrawals.push([withdraw, Date.now()]);

      data = { ...data, withdrawals };
    }

    const payload: QueryResponse = await faunaClient.query(
      Update(Ref(Collection(this.collection), id), { data: { ...data } })
    );

    const result = makeSuccessResponse('Saque efetuado!', payload.data);

    return result;
  }
}
