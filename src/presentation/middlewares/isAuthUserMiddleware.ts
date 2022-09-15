import { pinoAdapterInstance } from '@app/shared/container';
import { ITokenAdapter } from '@application/ports/ITokenAdapter';
import { Request } from 'express';
import { noContent, unauthorized } from '../controllers/helpers/httpHelper';
import { BaseMiddleware } from './contracts/BaseMiddleware';

export default class IsAuthUserMiddleware implements BaseMiddleware {
  constructor(private readonly jwt: ITokenAdapter) {}

  public handle(req: Request) {
    const { token } = req.cookies;

    if (!token) {
      return unauthorized('Unauthorized');
    }
    try {
      const isUser = this.jwt.decode(token);
      if (isUser.type === 'USER') {
        return noContent();
      } else {
        return unauthorized('Unauthorized');
      }
    } catch (err: any) {
      pinoAdapterInstance.error('InvalidJWTError', err);
      return unauthorized('Unauthorized');
    }
  }
}
