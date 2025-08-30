import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
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
  total: number;

  // TODO: add this to the swagger
  @IsArray()
  @ApiProperty({ type: 'array' })
  tickets: TicketType[];
}

type TicketType = {
  type: 'VIP' | 'REGULAR';
  quantity: number;
};
