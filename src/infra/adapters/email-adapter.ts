import 'reflect-metadata';
import { singleton } from 'tsyringe';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { forgotTemplate } from '@shared/templates/emailTemplate';

@singleton()
export default class EmailAdapter implements EmailAdapter {
  client: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAILPASS,
    },
  });

  public async sendValidateEmail(to: string, token: string): Promise<boolean> {
    await this.client.sendMail({
      from: '"Food OnClick 🍔" <foondonclick@gmail.com>',
      to,
      subject: 'Seu código de ativação',
      html: forgotTemplate(token, to),
    });
    return true;
  }

  public async sendRecoverEmail(to: string, token: string): Promise<boolean> {
    await this.client.sendMail({
      from: '"Food OnClick 🍔" <foondonclick@gmail.com>',
      to,
      subject: 'Seu código de recuperação de senha',
      html: forgotTemplate(token, to),
    });
    return true;
  }
}
