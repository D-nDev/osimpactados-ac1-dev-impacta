export default class UserNotFoundException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('User not found');
    this.name = 'UserNotFound';
    this.code = code;
  }
}
