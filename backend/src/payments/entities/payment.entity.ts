import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '@prisma/client';

export class PaymentEntity implements Payment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  ammount: number;

  @ApiProperty({
    enum: ['CARD', 'PAYPAL', 'TRANSFER', 'OTHER'],
  })
  method: 'CARD' | 'PAYPAL' | 'TRANSFER' | 'OTHER';

  @ApiProperty({
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
  })
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
