import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength, ValidateIf, IsNumber } from 'class-validator';

export default class CreateTaskDto {
  @ApiProperty({
    type: 'string',
    description: 'The description of the task',
    default: 'Working on users login API',
    required: false,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: 'string',
    description: "The task start Date",
    default: '1653867534',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  startDate: number;

  @ApiProperty({
    type: 'string',
    description: "The task work from",
    default: '1653867534',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  workFrom: number;

  @ApiProperty({
    type: 'string',
    description: "The task work to",
    default: '1653867534',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  workTo: number;

}

