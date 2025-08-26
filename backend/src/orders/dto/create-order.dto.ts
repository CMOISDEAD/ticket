import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  total: number;

  @ApiProperty({
    enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
  })
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';

  @ApiProperty({
    type: [String],
  })
  ticketIds: string[];
}
