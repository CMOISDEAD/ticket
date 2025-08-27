import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [VenuesController],
  providers: [VenuesService],
  imports: [PrismaModule],
})
export class VenuesModule {}
