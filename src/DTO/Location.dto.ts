import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class LocationDTO {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '998989898',
  })

  Latitude: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '865555898',
  })
Longitude: string;

  
}