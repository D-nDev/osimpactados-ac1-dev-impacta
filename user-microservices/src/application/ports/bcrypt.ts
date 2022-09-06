export interface bcryptEncoder {
  hash(password: string): Promise<string>
  compare(password: string, hash: string): Promise<Boolean>
}