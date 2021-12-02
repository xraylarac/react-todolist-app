export type Deposit = [number, number];
export type Withdraw = [number, number];

export interface CyberAccount {
  cyberId: string;
  cyberEmail: string;
  name: string;
  accountType: 'checking-account' | 'saving-account';
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  deleted: null | boolean;
  deposits?: Deposit[];
  withdrawals?: Withdraw[];
}
