export default class RequiredTwoFactorTokenException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('No 2FA Code Provided');
    this.name = 'RequiredTwoFactorToken';
    this.code = code;
  }
}
