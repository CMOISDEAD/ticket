import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  fullnames: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  lastnames: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsEnum(['ADMIN', 'USER'], {
    message: "Role must be 'ADMIN' or 'USER'.",
  })
  @ApiProperty({
    required: false,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  })
  role?: 'ADMIN' | 'USER' = 'USER';
}
