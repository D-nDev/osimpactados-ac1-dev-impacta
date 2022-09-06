export interface MailAdapter {
  sendValidateEmail(to: string, token: string): Promise<void>
  sendRecoverEmail(to: string, token: string): Promise<void>
}