import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  total: number;

  @ApiProperty({
    enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
  })
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
