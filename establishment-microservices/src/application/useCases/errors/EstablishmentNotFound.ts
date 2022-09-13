export default class EstablishmentNotFoundException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Establishment not found');
    this.name = 'EstablishmentNotFound';
    this.code = code;
  }
}
