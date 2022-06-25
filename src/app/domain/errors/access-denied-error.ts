export class AccessDeniedError extends Error {
  constructor(message = 'Access Denied') {
    super(message);
    this.name = AccessDeniedError.name;
  }
}
