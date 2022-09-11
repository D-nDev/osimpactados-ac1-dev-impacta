export interface IMailAdapter {
  sendValidateEmail: (to: string, token: string) => Promise<void>;
  sendRecoverEmail: (to: string, token: string) => Promise<void>;
}
