import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  total: number;

  @IsEnum(['PENDING', 'COMPLETED', 'CANCELLED'], {
    message: "Status must be 'PENDING', 'COMPLETED' or 'CANCELLED'.",
  })
  @ApiProperty({ enum: ['PENDING', 'COMPLETED', 'CANCELLED'] })
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';

  @IsArray()
  @ApiProperty({ type: [String] })
  ticketIds: string[];
}
