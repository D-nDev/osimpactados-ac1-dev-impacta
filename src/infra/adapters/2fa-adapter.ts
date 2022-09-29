import { singleton } from 'tsyringe';
import { ITwoFactorAdapter } from '@application/ports/ITwoFactorAdapter';
import * as node2fa from 'node-2fa';

@singleton()
export class TwoFactorAdapter implements ITwoFactorAdapter {
  public generateSecret(email: string): {
    secret: string;
    uri: string;
    qr: string;
  } {
    try {
      const newSecret = node2fa.generateSecret({
        name: (process.env.TWOFACTOR_APP_NAME as string) ?? 'FoondOnClick-dev-establishment',
        account: email,
      });
      return newSecret;
    } catch (err: any) {
      throw new Error('Cannot generate 2FA Secret');
    }
  }

  public verifyToken(secret: string, code: string): Boolean {
    const result = node2fa.verifyToken(secret, code);

    if (result?.delta === 0) {
      return true;
    }
    return false;
  }
}
