export default class EstablishmentAlreadyExistsException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('This establishment already exists');
    this.name = 'EstablishmentExists';
    this.code = code;
  }
}
