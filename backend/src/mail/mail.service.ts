import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
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

  async sendWelcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: '👾 Bienvenido a QueBoleta',
      template: 'welcome',
      context: {
        activationLink: `${process.env.FRONTEND_URL}/activate/${user.id}`,
        fullnames: `${user.fullnames} ${user.lastnames}`,
        couponCode: 'QBO25',
      },
    });
  }

  async sendLoginEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: '⚡ Inicio de sesión detectado',
      template: 'login',
      context: {
        fullnames: `${user.fullnames} ${user.lastnames}`,
      },
    });
  }

  async sendRequestPasswordResetEmail(user: User, token: string) {
    await this.mailerService.sendMail({
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: 'Password Reset Request',
      template: 'reset-password',
      context: {
        fullnames: `${user.fullnames} ${user.lastnames}`,
        resetLink: `${process.env.FRONTEND_URL}/auth/reset-password/${token}`,
      },
    });

    this.logger.log(
      `Reset password email sent to ${user.email} with subject: Password Request Reset`,
    );
  }

  async sendPasswordResetEmail(user: User) {
    const subject = 'Password has been reset successfully.';
    await this.mailerService.sendMail({
      from: process.env.MAIL_FROM,
      to: user.email,
      subject,
      template: 'password-changed',
      context: {
        fullnames: `${user.fullnames} ${user.lastnames}`,
      },
    });

    this.logger.log(
      `Reset password email sent to ${user.email} with subject: ${subject}`,
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
      template: 'order-paid',
      context: {
        orderId: order.id,
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
      template: 'order-rejected',
      context: {
        orderId: order.id,
      },
    });

    this.logger.log(`payment rejected email send`);
  }
}
