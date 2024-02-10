export class CepError extends Error {
  constructor(message = 'CEP param not found') {
    super(message);
    this.name = CepError.name;
  }
}
