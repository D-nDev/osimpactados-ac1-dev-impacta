import { JwtPayload } from 'jsonwebtoken';

export interface ITokenAdapter {
  verify: (token: string) => boolean;
  sign: (establishment: { email: string; name: string; type: string }) => { token: string };
  decode: (token: any) => JwtPayload & { email: string; name: string; type: string };
}
