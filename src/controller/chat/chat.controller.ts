import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import * as mongoose from 'mongoose';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { CreateChatDto } from 'src/DTO/create-chat.dot';
import { FindChatDto } from 'src/DTO/findchat-dto';
import { UpdateChatDto } from 'src/DTO/updateChat.dto';
// @UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('Chat')

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  create(@Body() createChatDto: CreateChatDto) {
      return this.chatService.createRoom(createChatDto);
    }
  @Get(':id')
  // @ApiParam({ name: 'id', type: mongoose.Types.ObjectId, description: 'The ID of the chatroom' })
// @Param('id') id: string
  // findChatroom(@Body() id:FindChatDto) {
  //   return this.chatService.findChatroom(id);
  // }
  findChatroom(@Param('id') id:string) {
    return this.chatService.findChatroom(id);
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatService.findOne(+id);
  // }

  @Patch(':id')
  updafindChatroom(@Param('id') id:string,@Body() updateChatDto:UpdateChatDto) {
    return this.chatService.updateChatMessage(updateChatDto,id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatService.remove(+id);
  // }
}
