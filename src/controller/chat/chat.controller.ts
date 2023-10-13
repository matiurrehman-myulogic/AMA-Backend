import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { ChatService } from './chat.service';
import * as mongoose from 'mongoose';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { CreateChatDto } from 'src/DTO/create-chat.dot';
import { FindChatDto } from 'src/DTO/findchat-dto';
import { UpdateChatDto } from 'src/DTO/updateChat.dto';
import { ChatGateway } from './chat.gateway';
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
  ) {}

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
  findChatroom(@Param('id') id: string) {
    return this.chatService.findChatroom(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Patch(':id')
  updafindChatroom(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto,
  ) {
    return this.chatService.updateChatMessage(req.payload.id,updateChatDto, id);
  }

  @Get('getInprogressChat/:id')
  findActiveChatroom(@Param('id') id: string) {
    return this.chatService.findInProgressChatroom(id);
  }
  @Get('GetResponseToQuestion/:id')
  addResponseToQuestion(@Param('id') id: string) {
    return this.chatService.addResponseToQuestion(id);
  }
  @Patch('ResetSeenCount/:roomId')
  AddResponse (
    @Param('roomId') id: string,
    @Req() req: any,

  ) {
    return this.chatService.ResetSeenCount(req.payload.id,id);
  
  }
}
