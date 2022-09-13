export default class RecoverTokenExpired extends Error {
  public readonly code: string;

  constructor(code: string = 'Token expired') {
    super('Token expired');
    this.name = 'RecoverTokenExpired';
    this.code = code;
  }
}
