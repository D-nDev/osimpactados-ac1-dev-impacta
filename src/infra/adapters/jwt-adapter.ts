import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { ITokenAdapter } from '@application/ports/ITokenAdapter';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import InvalidJwtException from '../errors/InvalidJwtException';

@singleton()
export default class jwtAdapter implements ITokenAdapter {
  public verify(token: string): boolean {
    try {
      verify(token, process.env.SECRET as string);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  public sign(establishment: { id: string; email: string; name: string; type: string }): any {
    try {
      const token = sign(
        {
          ...establishment,
        },
        process.env.SECRET as string,
        { expiresIn: '2d' },
      );
      return { token };
    } catch (err: any) {
      throw new Error(err.message || 'Cannot sign establishment');
    }
  }

  public decode(token: any): JwtPayload & { id: string; email: string; name: string; type: string } {
    try {
      const decodedtoken = verify(token, process.env.SECRET as string) as JwtPayload & {
        id: string;
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
