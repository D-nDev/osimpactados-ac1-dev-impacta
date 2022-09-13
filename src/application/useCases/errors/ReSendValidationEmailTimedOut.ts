export default class ReSendValidationEmailTimedOutException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('ReSend Email Validation Timed out');
    this.name = 'ResendEmailValidationNotAllowedYet';
    this.code = code;
  }
}
