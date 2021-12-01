export class UnauthorizedError extends Error {
  constructor() {
    super('Não autorizado.');

    this.name = 'Unauthorized';
    this.message = 'Não autorizado.';
  }
}
