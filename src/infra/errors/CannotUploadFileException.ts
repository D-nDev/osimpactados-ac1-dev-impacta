export default class CannotUploadFileException extends Error {
  public readonly code: string;

  constructor(code: string) {
    super('Cannot Upload file');
    this.name = 'UploadFileError';
    this.code = code;
  }
}
