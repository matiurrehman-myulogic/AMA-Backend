
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Can anyone tell me how to start my career as Data scientist?',
  })
  question: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example:'[datascientist,career]',
  })
  tags:string[];

  @IsOptional()
  @ApiProperty({
    required: true,
    example:"San Francisco, CA, USA"
  })
  location: string;

  @IsOptional()
  @ApiProperty({
    required: true,
    example: 'http://uri.com',
  })
  pic: string;
}