import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [PrismaModule],
})
export class OrdersModule {}
