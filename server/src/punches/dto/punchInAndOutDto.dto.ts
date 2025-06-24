import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength, ValidateIf, IsNumber } from 'class-validator';

export default class PunchInAndOutDto {
  @ApiProperty({
    type: 'string',
    description: "User email",
    default: 'johndoe@gmail.com',
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

}

