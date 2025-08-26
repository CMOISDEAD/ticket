import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from '@prisma/client';

export class TicketEntity implements Ticket {
  @ApiProperty()
  id: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  seat: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  type: 'REGULAR' | 'VIP';

  @ApiProperty()
  status: 'AVAILABLE' | 'SOLD' | 'RESERVED';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
