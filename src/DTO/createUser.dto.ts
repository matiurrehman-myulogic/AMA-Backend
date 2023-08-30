import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '123456789',
  })
  Phone_Number: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'First_Name Last_Name',
  })
  FullName: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'example@gmail.com',
  })
  Email: string;

  @IsOptional()
  @ApiProperty({
    required: true,
    example: 'http://uri.com',
  })
  ProfilePic: string;
}