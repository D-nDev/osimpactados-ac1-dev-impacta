export default class ValidateTokenNotExistsException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('This token does not exists');
    this.name = 'ValidateToken';
    this.code = code;
  }
}
