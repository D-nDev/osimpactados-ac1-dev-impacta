import { JwtPayload } from "jsonwebtoken"

export interface IJwtAdapter {
  verify(token: string): boolean
  sign(establishment: { email: string, name: string, type: string }): any
  decode(token: any): JwtPayload & { email: string, name: string, type: string }
}