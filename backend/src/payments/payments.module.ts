import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [PrismaModule],
})
export class PaymentsModule {}
