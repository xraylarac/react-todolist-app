export interface CyberAccount {
  cyberId: string;
  cyberEmail: string;
  name: string;
  accountType: 'checking-account' | 'saving-account';
  balance: number;
}
