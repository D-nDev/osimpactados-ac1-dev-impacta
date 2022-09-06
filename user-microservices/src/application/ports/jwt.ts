import { JwtPayload } from "jsonwebtoken"

export interface jwtToken {
  verify(token: string): boolean
  sign(user: { email: string, name: string }): any
  decode(token: any): string | JwtPayload
}