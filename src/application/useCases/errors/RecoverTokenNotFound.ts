export default class RecoverTokenNotFoundException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Token not found');
    this.name = 'RecoverTokenNotFound';
    this.code = code;
  }
}
