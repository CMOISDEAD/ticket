import { ApiProperty } from '@nestjs/swagger';

export class CreateVenueDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  capacity: number;
}
