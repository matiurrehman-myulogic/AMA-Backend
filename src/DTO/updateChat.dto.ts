
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Message_Status } from 'src/constants/MessageStatus';
import { Message_Type } from 'src/constants/messageType.constants';
import { User_Status } from 'src/constants/user.constants';
import { Message } from 'src/schema/common/Message.schema';
import { Location, LocationSchema } from 'src/schema/common/location.schema';

export class UpdateChatDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "64fec0bbce7c501f5634d440",
  })
  senderId: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "Hello,How are you?",
  })
  message: string;
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type:String,
    enum:Object.keys(Message_Type),
    default:Message_Type.TEXT,
    example: "TEXT",
  })
  messageType: Message_Type;

  @IsOptional()
  @ApiProperty({
    type:String,
    enum:Object.keys(Message_Status),
  })
  status: Message_Status;




 @IsOptional()
  @ApiProperty({
   
    type:String,

    example: "www.image.com",
  })
  imgageURL: Message_Type;

}