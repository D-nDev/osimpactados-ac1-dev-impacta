export default class BlackListedRecoverTokenException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Provided blacklisted token');
    this.name = 'BlackListedRecoverToken';
    this.code = code;
  }
}
