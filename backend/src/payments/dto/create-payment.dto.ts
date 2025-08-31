import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  orderId: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  ammount: number;

  @IsEnum(['DEBIT_CARD', 'CREDIT_CARD', 'PAYPAL', 'TRANSFER', 'PSE', 'OTHER'], {
    message:
      "Method must be 'CREDIT_CARD', 'DEDBIT_CARD', 'TRANSFER' or 'OTHER'.",
  })
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
}
