export interface bcryptEncoder {
  hash(password: string): Promise<string>
  unhash(password: string, hash: string): Promise<Boolean>
}