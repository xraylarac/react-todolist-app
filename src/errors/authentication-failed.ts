export class AuthenticationFailed extends Error {
  constructor() {
    super('Autenticação falhou.');

    this.name = 'AuthenticationFailed';
    this.message = 'Autenticação falhou.';
  }
}
