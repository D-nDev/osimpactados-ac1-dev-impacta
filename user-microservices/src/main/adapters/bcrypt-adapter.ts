import * as bcrypt from "bcrypt";

export default class BcryptAdapter {
  public async hash(password: string) {
    try {
      const result = await bcrypt.hash(password, 10);
      return result;
    } catch (err: any) {
      throw new Error(err.message || "Fail hashing password")
    }
  }

  public async unhash(password: string, hash: string) {
    try {
      const result = await bcrypt.compare(password, hash);
      return result;
    } catch (err: any) {
      throw new Error(err.message || "Fail unhashing password")
    }
  }
}