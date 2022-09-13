export default class CannotCreateNewUserException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Cannot create new User');
    this.name = 'NewUserError';
    this.code = code;
  }
}
