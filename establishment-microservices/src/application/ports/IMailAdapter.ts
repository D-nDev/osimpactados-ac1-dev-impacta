export interface IMailAdapter {
  sendValidateEmail: (to: string, token: string) => Promise<boolean>;
  sendRecoverEmail: (to: string, token: string) => Promise<boolean>;
}
