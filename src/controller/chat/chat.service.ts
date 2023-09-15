import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from 'src/schema/chat.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    private config:ConfigService,
    @InjectModel(Chat.name)
    private ChatModel: mongoose.Model<ChatDocument>,
  

 
  ) {}
  async createRoom(data:CreateChatDto):Promise<Chat> {
   
    const res = await this.ChatModel.create({...data});
    return res;

  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
