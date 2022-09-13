import RecoverTokenExpired from './RecoverTokenExpired';

export default class ValidateTokenExpired extends RecoverTokenExpired {
  public readonly code: string;

  constructor(code: string) {
    super();
    this.name = 'ValidateTokenExpired';
    this.code = code;
  }
}
