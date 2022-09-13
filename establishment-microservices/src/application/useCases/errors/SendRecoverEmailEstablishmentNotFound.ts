export default class SendRecoverEmailEstablishmentNotFoundException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Establishment not found');
    this.name = 'SendRecoverEmailEstablishmentNotFoundError';
    this.code = code;
  }
}
