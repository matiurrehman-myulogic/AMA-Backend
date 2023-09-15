import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import * as mongoose from 'mongoose';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { CreateChatDto } from 'src/DTO/create-chat.dot';
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('Chat')

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
      return this.chatService.createRoom(createChatDto);
    }
//   @Get(':id')
//   // @ApiParam({ name: 'id', type: mongoose.Types.ObjectId, description: 'The ID of the chatroom' })
// // @Param('id') id: string
//   findChatroom(@Param() params: any) {
//     return this.chatService.findChatroom(params.);
//   }
  @Get(':idd')
  findChatroom(@Param('idd') id: mongoose.Types.ObjectId) {
    return this.chatService.findChatroom(id);
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto:any) {
    return this.chatService.update(+id, updateChatDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatService.remove(+id);
  // }
}
