import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { IMailAdapter } from '@application/ports/IMailAdapter';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@singleton()
export default class EmailAdapter implements IMailAdapter {
  client: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'foondonclick@gmail.com',
      pass: process.env.MAILPASS,
    },
  });

  public async sendValidateEmail(to: string, token: string) {
    await this.client.sendMail({
      from: '"Food OnClick 🍔" <foondonclick@gmail.com>',
      to,
      subject: 'Seu código de ativação',
      html: `<b>${token}</b>`,
    });
    return true;
  }

  public async sendRecoverEmail(to: string, token: string) {
    await this.client.sendMail({
      from: '"Food OnClick 🍔" <foondonclick@gmail.com>',
      to,
      subject: 'Seu código de recuperação de senha',
      html: `<b>${token}</b>`,
    });
    return true;
  }
}
