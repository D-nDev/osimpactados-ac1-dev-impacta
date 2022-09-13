export default class InvalidValidateTokenException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Provided token invalid');
    this.name = 'InvalidValidateToken';
    this.code = code;
  }
}
