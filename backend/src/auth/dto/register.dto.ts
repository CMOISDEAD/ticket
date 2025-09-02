import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {
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
}
