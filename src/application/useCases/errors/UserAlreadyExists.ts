export default class UserAlreadyExistsException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('This user already exists');
    this.name = 'UserExists';
    this.code = code;
  }
}
