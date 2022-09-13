export default class SendRecoverSMSEstablishmentNotFoundException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Establishment not found');
    this.name = 'SendRecoverSMSEstablishmentNotFoundError';
    this.code = code;
  }
}
