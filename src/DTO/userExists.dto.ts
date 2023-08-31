import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class userExistsDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '123456789',
  })
  Phone_Number: string;

  
}