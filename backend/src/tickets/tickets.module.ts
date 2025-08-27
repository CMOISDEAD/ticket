import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [PrismaModule],
})
export class TicketsModule {}
