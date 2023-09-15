
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User_Status } from 'src/constants/user.constants';
import { Message } from 'src/schema/common/Message.schema';
import { Location, LocationSchema } from 'src/schema/common/location.schema';

export class CreateChatDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'j8474HJHH',
  })
  roomId: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example:'jhedjefhefeufe',
  })
  questionerId:string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    default:null,
    example:'jhedjefhefeufe',
  })
  answererId:string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    default:[]
  })
  messages:Message[];

}