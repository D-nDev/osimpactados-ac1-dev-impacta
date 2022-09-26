export default class InvalidTwoFactorTokenException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Provided 2fa token is invalid');
    this.name = 'InvalidTwoFactorToken';
    this.code = code;
  }
}
