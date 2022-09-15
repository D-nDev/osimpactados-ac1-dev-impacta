import { JwtPayload } from 'jsonwebtoken';

export interface ITokenAdapter {
  verify: (token: string) => boolean;
  sign: (user: { id: string; email: string; name: string; type: string }) => { token: string };
  decode: (token: any) => JwtPayload & { id: string; email: string; name: string; type: string };
}
