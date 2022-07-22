import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(70)
  @ApiProperty({
    type: String,
    example: 'admin@ahan.vip',
  })
  email: string;

  @IsString()
  @Length(8, 50)
  @ApiProperty({
    type: String,
    example: 'Aa123456',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string;

}
