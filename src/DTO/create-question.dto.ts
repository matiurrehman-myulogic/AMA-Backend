
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User_Status } from 'src/constants/user.constants';
import { Location, LocationSchema } from 'src/schema/common/location.schema';

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
    example:['apple'],
  })
  tags:string[];

 @IsNotEmpty()
  @ApiProperty({
    required: true,
    type:LocationSchema,
    example:{
      Latitude:'26.47104000',
      Longitude:'91.03080000'
    },
  })
  Location: Location;

  @IsOptional()
  @ApiProperty({
    required: true,
    example: 'http://uri.com',
  })
  
  pic: string;

  @ApiProperty({
    required: true,
    type:String,
    enum:Object.keys(User_Status),
    default:User_Status.OPEN
  
  })
  
  status: User_Status;
}