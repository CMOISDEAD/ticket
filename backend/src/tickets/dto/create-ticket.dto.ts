import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  seat: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  eventId: string;

  @IsEnum(['REGULAR', 'VIP'], { message: "Type must be 'REGULAR' or 'VIP'." })
  @ApiProperty({ enum: ['REGULAR', 'VIP'] })
  type: 'REGULAR' | 'VIP';

  @IsEnum(['AVAILABLE', 'SOLD', 'RESERVED'], {
    message: "Status must be 'AVAILABLE', 'SOLD' or 'RESERVED'.",
  })
  @ApiProperty({ enum: ['AVAILABLE', 'SOLD', 'RESERVED'] })
  status: 'AVAILABLE' | 'SOLD' | 'RESERVED';

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  orderId: string;
}
