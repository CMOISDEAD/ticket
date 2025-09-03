import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { PrismaModule } from 'nestjs-prisma';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: +process.env.MAIL_PORT!,
          secure: false,
          auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: `"No Reply" <${process.env.MAIL_FROM}>`,
        },
        template: {
          dir: path.join(process.cwd(), 'dist', 'mail', 'templates', 'pages'),
          adapter: new HandlebarsAdapter(),
        },
        options: {
          strict: true,
          partials: {
            dir: path.join(
              process.cwd(),
              'dist',
              'mail',
              'templates',
              'partials',
            ),
          },
        },
      }),
    }),
    PrismaModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
