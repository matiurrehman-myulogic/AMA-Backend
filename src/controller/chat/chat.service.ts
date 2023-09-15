import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from 'src/schema/chat.schema';
import * as mongoose from 'mongoose';
import { CreateChatDto } from 'src/DTO/create-chat.dot';
import { FindChatDto } from 'src/DTO/findchat-dto';

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

  async findChatroom(id:string) {
    const objectId = new mongoose.Types.ObjectId(id);

    const userDetail = await this.ChatModel.findOne({
      roomId:objectId
    })
  console.log("ussseerr",userDetail)
    return userDetail;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: any) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
