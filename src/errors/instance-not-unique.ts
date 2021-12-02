export class InstanceNotUniqueError extends Error {
  constructor() {
    super('Instância não única.');

    this.name = 'InstanceNotUnique';
    this.message = 'Instância não única.';
  }
}
