export default class UnknownErrorException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Unknown Error');
    this.name = 'UnknownError';
    this.code = code;
  }
}
