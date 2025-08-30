import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '@prisma/client';

export class PaymentEntity implements Payment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mpPaymentId: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  ammount: number;

  @ApiProperty({
    enum: ['CARD', 'PAYPAL', 'TRANSFER', 'OTHER'],
  })
  method: 'CARD' | 'PAYPAL' | 'TRANSFER' | 'OTHER';

  @ApiProperty({
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
  })
  status: 'PENDING' | 'APPROVED' | 'REJECTED';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
