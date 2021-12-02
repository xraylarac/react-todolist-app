export class InvalidDataError extends Error {
  constructor() {
    super('Dados inválidos.');

    this.name = 'InvalidData';
    this.message = 'Dados inválidos.';
  }
}
