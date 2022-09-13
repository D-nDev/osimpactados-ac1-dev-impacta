export default class SendRecoverSMSUserNotFoundException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('User not found');
    this.name = 'SendRecoverSMSUserNotFoundError';
    this.code = code;
  }
}
