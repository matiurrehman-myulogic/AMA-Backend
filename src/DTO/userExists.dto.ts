import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { createUserDto } from './createUser.dto';

export class userExistsDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '+911111111111',
  })
  Phone_Number: string;
}
// import { PartialType } from '@nestjs/swagger';
// import { createUserDto } from './createUser.dto';

