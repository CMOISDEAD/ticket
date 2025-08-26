import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty()
  description: string;

  @IsEnum(['CONCERT', 'THEATER', 'SPORT', 'FESTIVAL', 'OTHER'], {
    message:
      "Category must be 'CONCERT', 'THEATER', 'SPORT', 'FESTIVAL' or 'OTHER'.",
  })
  @ApiProperty({ enum: ['CONCERT', 'THEATER', 'SPORT', 'FESTIVAL', 'OTHER'] })
  category: 'CONCERT' | 'THEATER' | 'SPORT' | 'FESTIVAL' | 'OTHER';

  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number;

  @IsDateString()
  @ApiProperty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  venueId: string;
}
