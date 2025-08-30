import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from 'nestjs-prisma';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [PrismaModule, OrdersModule],
})
export class PaymentsModule {}
