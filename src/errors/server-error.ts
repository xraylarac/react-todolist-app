export class ServerError extends Error {
  constructor() {
    super('Erro no servidor.');

    this.name = 'ServerError';
    this.message = 'Erro no servidor.';
  }
}
