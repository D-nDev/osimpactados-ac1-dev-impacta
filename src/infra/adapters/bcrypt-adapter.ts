import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { IHashAdapter } from '@application/ports/bcrypt';
import * as bcrypt from 'bcrypt';
@singleton()
export default class BcryptAdapter implements IHashAdapter {
  public async hash(password: string) {
    try {
      const result = await bcrypt.hash(password, 10);
      return result;
    } catch (err: any) {
      throw new Error(err.message || 'Fail hashing password');
    }
  }

  public async compare(password: string, hash: string) {
    try {
      const result = await bcrypt.compare(password, hash);
      return result;
    } catch (err: any) {
      throw new Error(err.message || 'Fail unhashing password');
    }
  }
}
