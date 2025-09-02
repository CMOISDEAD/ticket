import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  poster: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ isArray: true })
  images: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(600)
  @ApiProperty()
  description: string;

  @IsEnum(['CONCERT', 'THEATER', 'SPORT', 'FESTIVAL', 'OTHER'], {
    message:
      "Category must be 'CONCERT', 'THEATER', 'SPORT', 'FESTIVAL' or 'OTHER'.",
  })
  @ApiProperty({ enum: ['CONCERT', 'THEATER', 'SPORT', 'FESTIVAL', 'OTHER'] })
  category: 'CONCERT' | 'THEATER' | 'SPORT' | 'FESTIVAL' | 'OTHER';

  @IsDateString()
  @ApiProperty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  venueId: string;

  @IsNumber()
  @ApiProperty()
  vipCapacity: number;

  @IsNumber()
  @ApiProperty()
  vipAvailable: number;

  @IsNumber()
  @ApiProperty()
  regularCapacity: number;

  @IsNumber()
  @ApiProperty()
  regularAvailable: number;

  @IsNumber()
  @ApiProperty()
  vipPrice: number;

  @IsNumber()
  @ApiProperty()
  regularPrice: number;
}
