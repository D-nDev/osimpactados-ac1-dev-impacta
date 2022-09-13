export default class ReSendRecoverSMSTimedOutException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('ReSend SMS Recover Timed out');
    this.name = 'ResendSMSRecoverNotAllowedYet';
    this.code = code;
  }
}
