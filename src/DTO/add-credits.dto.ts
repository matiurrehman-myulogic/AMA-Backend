import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class addCreditdto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
example:10
  })
  Points: number;
}
