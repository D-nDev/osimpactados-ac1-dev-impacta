export default class SendValidationEmailException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Cannot send validation email');
    this.name = 'ValidateEmail';
    this.code = code;
  }
}
