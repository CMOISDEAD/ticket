import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  eventId: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  total?: number;

  @ApiProperty({ enum: ['PENDING', 'COMPLETED', 'CANCELLED'] })
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}
