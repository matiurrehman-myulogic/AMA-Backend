import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Location, LocationSchema } from 'src/schema/common/location.schema';
import { LocationDTO } from './Location.dto';

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
@ValidateNested()
@Type(()=>LocationDTO)
@IsNotEmpty()
  @ApiProperty({
    required: true,
    type:LocationDTO
  })
  Location: Location;

  
  @IsOptional()
  @ApiProperty({
    example: 'HGHGHHHJGHGHGHHGH',
  })
  FCM: string;
}