export class InsufficientBalanceError extends Error {
  constructor() {
    super('Saldo insuficiente.');

    this.name = 'InsufficientBalance';
    this.message = 'Saldo insuficiente.';
  }
}
