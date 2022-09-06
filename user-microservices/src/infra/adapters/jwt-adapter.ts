import { jwtToken } from '@application/ports/jwt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { userDto } from '@application/ports/userDto';

export default class jwtAdapter implements jwtToken {
  public verify(token: string): boolean {
    try {
      verify(token, process.env.SECRET as string);
      return true;
    } catch (err: any) {
      return false;
    }
  }

  public sign(user: userDto): any {
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

  public decode(token: any): string | JwtPayload {
    try {
      const decodedtoken = verify(token, process.env.SECRET as string);
      return decodedtoken;
    } catch (err: any) {
      throw new Error(err.message || 'Cannot decode token');
    }
  }
}
