
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User_Status } from 'src/constants/user.constants';
import { Message } from 'src/schema/common/Message.schema';
import { Location, LocationSchema } from 'src/schema/common/location.schema';

export class CreateChatDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "64fff6faac0b2193cbed657b",
  })
  roomId: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example:'64fec0bbce7c501f5634d440',
  })
  questionerId:string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example:'64fec0bbce7c501f5634d440',
  })
  answererId:string;


  @ApiProperty({
    required: true,
    default:[]
  })
  messages:Message[];

}