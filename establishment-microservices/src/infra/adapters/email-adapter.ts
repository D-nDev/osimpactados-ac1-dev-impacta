import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class EmailAdapter implements EmailAdapter {
  client: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'foondonclick@gmail.com',
      pass: process.env.MAILPASS,
    },
  });

  public async sendValidateEmail(to: string, token: string): Promise<void> {
    await this.client.sendMail({
      from: '"Food OnClick 🍔" <foondonclick@gmail.com>',
      to,
      subject: 'Seu código de ativação',
      html: `<b>${token}</b>`,
    });
  }

  public async sendRecoverEmail(to: string, token: string): Promise<void> {
    await this.client.sendMail({
      from: '"Food OnClick 🍔" <foondonclick@gmail.com>',
      to,
      subject: 'Seu código de recuperação de senha',
      html: `<b>${token}</b>`,
    });
  }
}
