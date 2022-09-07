import twilio from 'twilio';

export default class TwilioAdapter {
  private client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTHTOKEN);

  public async sendRecoverSMS(to: string, token: string): Promise<boolean> {
    try {
      await this.client.messages.create({
        body: token,
        to: to,
        from: '+17816503526',
      });
      return true;
    } catch (err: any) {
      return false;
    }
  }
}
