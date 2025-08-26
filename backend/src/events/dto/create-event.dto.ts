import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    enum: ['CONCERT', 'THEATER', 'SPORT', 'FESTIVAL', 'OTHER'],
  })
  category: 'CONCERT' | 'THEATER' | 'SPORT' | 'FESTIVAL' | 'OTHER';

  @ApiProperty()
  price: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  venueId: string;
}
