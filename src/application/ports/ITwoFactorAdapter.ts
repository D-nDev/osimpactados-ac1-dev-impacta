export interface ITwoFactorAdapter {
  generateSecret: (email: string) => {
    secret: string;
    uri: string;
    qr: string;
  };

  verifyToken: (secret: string, code: string) => Boolean;
}
