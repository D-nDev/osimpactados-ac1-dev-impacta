export interface ITwilioAdapter {
  sendRecoverSMS(to: string, token: string): Promise<boolean>
}