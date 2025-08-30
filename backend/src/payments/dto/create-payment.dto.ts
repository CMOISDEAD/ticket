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

  @IsEnum(['CARD', 'PAYPAL', 'TRANSFER', 'OTHER'], {
    message: "Method must be 'CARD', 'PAYPAL', 'TRANSFER' or 'OTHER'.",
  })
  @ApiProperty({ enum: ['CARD', 'PAYPAL', 'TRANSFER', 'OTHER'] })
  method: 'CARD' | 'PAYPAL' | 'TRANSFER' | 'OTHER';
}
