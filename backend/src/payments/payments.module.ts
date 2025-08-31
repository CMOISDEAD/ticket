import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from 'nestjs-prisma';
import { OrdersModule } from 'src/orders/orders.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [PrismaModule, OrdersModule, MailModule],
})
export class PaymentsModule {}
