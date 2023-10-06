import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class addReponseDTO {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'This is my response',
  })
  answer: string;
}
