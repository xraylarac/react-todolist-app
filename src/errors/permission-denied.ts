export class PermissionDeniedError extends Error {
  constructor() {
    super('Permissão negada.');

    this.name = 'PermissionDenied';
    this.message = 'Permissão negada.';
  }
}
