import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  orderId: string;

  @ApiProperty()
  ammount: number;

  @ApiProperty()
  method: 'CARD' | 'PAYPAL' | 'TRANSFER' | 'OTHER';

  @ApiProperty()
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}
