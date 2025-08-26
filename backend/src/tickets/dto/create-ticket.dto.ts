import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  price: number;

  @ApiProperty()
  seat: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  type: 'REGULAR' | 'VIP';

  @ApiProperty()
  status: 'AVAILABLE' | 'SOLD' | 'RESERVED';

  @ApiProperty()
  orderId: string;
}
