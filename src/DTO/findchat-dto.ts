
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Message } from 'src/schema/common/Message.schema';
import * as mongoose from 'mongoose';

export class FindChatDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "64fff6faac0b2193cbed657b",
  })
  id: mongoose.Types.ObjectId;






}