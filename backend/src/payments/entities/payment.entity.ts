import { ApiProperty } from '@nestjs/swagger';
import { Payment } from '@prisma/client';

export class PaymentEntity implements Payment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty({
    enum: ['DEBIT_CARD', 'CREDIT_CARD', 'PAYPAL', 'TRANSFER', 'PSE', 'OTHER'],
  })
  method:
    | 'DEBIT_CARD'
    | 'CREDIT_CARD'
    | 'PAYPAL'
    | 'TRANSFER'
    | 'PSE'
    | 'OTHER';

  @ApiProperty({
    enum: [
      'PENDING',
      'APPROVED',
      'REJECTED',
      'EXPIRED',
      'CANCELLED',
      'REFUNDED',
    ],
  })
  status:
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'EXPIRED'
    | 'CANCELLED'
    | 'REFUNDED';

  @ApiProperty()
  mpPreferenceId: number;

  @ApiProperty()
  mpPaymentId: number;

  @ApiProperty()
  mpStatusDetail: string;

  @ApiProperty()
  mpCurrency: string;

  @ApiProperty()
  mpTransactionAmount: number;

  @ApiProperty()
  mpNetReceivedAmount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
