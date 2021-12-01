export class InstanceNotUniqueError extends Error {
  constructor() {
    super('Instância não única.');

    this.name = 'InstanceNotUniquee';
    this.message = 'Instância não única.';
  }
}
