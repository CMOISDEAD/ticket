import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  private logger = new Logger(MailService.name);

  async sendEmail(to: string, subject: string, content: string) {
    await this.mailerService.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text: content,
    });

    this.logger.log(`Email sent to ${to} with subject: ${subject}`);
  }

  async sendRequestPasswordResetEmail(to: string, token: string) {
    await this.mailerService.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: 'Password Reset Request',
      text: `http://localhost:3000/auth/reset-password/${token}`,
    });

    this.logger.log(
      `Reset password email sent to ${to} with subject: Password Request Reset`,
    );
  }

  async sendPasswordResetEmail(to: string) {
    const subject = 'Password has been reset successfully.';
    await this.mailerService.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text: 'Your password has been reset successfully.',
    });

    this.logger.log(
      `Reset password email sent to ${to} with subject: ${subject}`,
    );
  }
}
