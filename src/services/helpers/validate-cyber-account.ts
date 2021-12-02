import { CyberAccount } from '../../usecases/create-account/create-account-dto';

export function validateAccount(body: CyberAccount): boolean {
  if (body.cyberEmail && body.name && body.accountType) {
    return true;
  } else {
    return false;
  }
}
