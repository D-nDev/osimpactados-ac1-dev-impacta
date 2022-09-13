export default class InvalidPasswordException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Invalid password');
    this.name = 'InvalidEstablishmentPassword';
    this.code = code;
  }
}
