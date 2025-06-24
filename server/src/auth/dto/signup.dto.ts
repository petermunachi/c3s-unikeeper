import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export default class SignupDto {
  @ApiProperty({
    type: 'string',
    description: 'The email of the user',
    default: 'dummy1@gmail.com',
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'The password of the user',
    default: '123456789',
    required: false,
  })
  @IsString()
  @MinLength(8, {
    message: 'Password should be greater than 8',
  })
  password: string;

  @ApiProperty({
    type: 'string',
    description: "The user's position",
    default: 'system administrator',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({
    type: 'string',
    description: "The user's first name",
    default: 'John',
    required: false,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: 'string',
    description: "The user's last name",
    default: 'Fancy',
    required: false,
  })
  @IsString()
  lastName: string;

}

