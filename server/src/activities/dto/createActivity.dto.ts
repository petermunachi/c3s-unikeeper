import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export default class CreateActivityDto {

  @ApiProperty({
    type: 'string',
    description: "The last login of the user",
    default: '1653867534',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  lastLogin?: number;

  @ApiProperty({
    type: 'string',
    description: "The last logout of the user",
    default: '1653867534',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  lastLogout?: number;

  @ApiProperty({
    type: 'string',
    description: "The last punch id",
    default: '111',
    required: false,
  })
  @IsNotEmpty()
  @IsUUID()
  lastPunchId?: string;

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

