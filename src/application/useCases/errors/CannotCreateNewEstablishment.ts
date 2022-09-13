export default class CannotCreateNewEstablishmentException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Cannot create new Establishment');
    this.name = 'NewEstablishmentError';
    this.code = code;
  }
}
