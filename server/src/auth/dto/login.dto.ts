import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export default class LoginDto {
  @ApiProperty({
    type: 'string',
    description: 'The email of the user',
    required: false,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'The password of the user',
    required: false,
  })
  @IsString()
  @MinLength(8)
  password: string;

}
