import { ITokenAdapter } from '@application/ports/ITokenAdapter';
import { Request } from 'express';
import { noContent, unauthorized } from '../controllers/helpers/httpHelper';
import { BaseMiddleware } from './contracts/BaseMiddleware';

export default class IsAdminMiddleware implements BaseMiddleware {
  constructor(private readonly jwt: ITokenAdapter) {}

  public handle(req: Request) {
    const { token } = req.cookies;

    if (!token) {
      return unauthorized('Unauthorized');
    }
    const isAdmin = this.jwt.decode(token);

    if (isAdmin.type === 'ADMIN') {
      return noContent();
    } else {
      return unauthorized('Unauthorized');
    }
  }
}
