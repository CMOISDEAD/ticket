import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [PrismaModule],
})
export class EventsModule {}
