export default class ReSendRecoverEmailTimedOutException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('ReSend Email Recover Timed out');
    this.name = 'ResendEmailRecoverNotAllowedYet';
    this.code = code;
  }
}
