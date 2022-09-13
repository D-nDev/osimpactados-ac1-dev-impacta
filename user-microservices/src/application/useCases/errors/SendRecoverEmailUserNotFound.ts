export default class SendRecoverEmailUserNotFoundException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('User not found');
    this.name = 'SendRecoverEmailUserNotFoundError';
    this.code = code;
  }
}
