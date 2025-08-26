import { ApiProperty } from '@nestjs/swagger';
import { Venue } from '@prisma/client';

export class VenueEntity implements Venue {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
