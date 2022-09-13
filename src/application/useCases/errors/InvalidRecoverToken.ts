export default class InvalidRecoverTokenException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Provided token invalid');
    this.name = 'InvalidRecoverToken';
    this.code = code;
  }
}
