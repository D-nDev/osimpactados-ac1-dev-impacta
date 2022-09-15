export interface IUploadProvider {
  getFiles: () => Promise<any>;
  fileExists: (name: string) => Promise<boolean>;
  getfileUrl: (name: string) => Promise<string | null>;
  uploadFile: (file: Buffer, type: string) => Promise<string>;
}
