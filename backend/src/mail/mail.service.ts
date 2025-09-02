import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private prisma: PrismaService,
  ) {}
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

  async paymentAprovedEmail(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        payments: true,
        user: true,
        tickets: true,
      },
    });

    if (!order)
      throw new NotFoundException(`Order with ID ${orderId} not found`);

    await this.mailerService.sendMail({
      from: process.env.MAIL_FROM,
      to: order.user.email,
      subject: `Order ${order.id} paid successfully`,
      template: 'payment-approved',
      context: {
        id: order.id,
        username: order.user.username,
        status: order.status,
        tickets: order.tickets.length,
      },
    });

    this.logger.log(`payment approved email send`);
  }

  async paymentRejectedEmail(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        tickets: true,
      },
    });

    if (!order)
      throw new NotFoundException(`Order with ID ${orderId} not found`);

    await this.mailerService.sendMail({
      from: process.env.MAIL_FROM,
      to: order.user.email,
      subject: `Order ${order.id} was rejected.`,
      text: `Order with id ${order.id} was  rejected. tickets: ${order.tickets.length}`,
    });

    this.logger.log(`payment rejected email send`);
  }
}
