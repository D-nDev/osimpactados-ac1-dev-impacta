import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { ITokenAdapter } from '@application/ports/ITokenAdapter';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import InvalidJwtException from '../errors/InvalidJwtException';
@singleton()
export default class jwtAdapter implements ITokenAdapter {
  public verify(token: string) {
    try {
      verify(token, process.env.SECRET as string);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  public sign(user: { email: string; name: string; type: string }) {
    try {
      const token = sign(
        {
          ...user,
        },
        process.env.SECRET as string,
        { expiresIn: '2d' },
      );
      return { token };
    } catch (err: any) {
      throw new Error(err.message || 'Cannot sign user');
    }
  }

  public decode(token: any) {
    try {
      const decodedtoken = verify(token, process.env.SECRET as string) as JwtPayload & {
        email: string;
        name: string;
        type: string;
      };
      return decodedtoken;
    } catch (err: any) {
      throw new InvalidJwtException('INVALID_JWT');
    }
  }
}
