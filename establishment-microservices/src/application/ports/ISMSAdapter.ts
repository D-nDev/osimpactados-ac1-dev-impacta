export interface ISMSAdapter {
  sendRecoverSMS: (to: string, token: string) => Promise<boolean>;
}
