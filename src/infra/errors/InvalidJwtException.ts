export default class InvalidJwtException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Invalid JWT');
    this.name = 'InvalidJWTError';
    this.code = code;
  }
}
