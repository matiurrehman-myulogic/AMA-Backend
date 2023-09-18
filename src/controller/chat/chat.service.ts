import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from 'src/schema/chat.schema';
import * as mongoose from 'mongoose';
import { CreateChatDto } from 'src/DTO/create-chat.dot';
import { FindChatDto } from 'src/DTO/findchat-dto';
import { UpdateChatDto } from 'src/DTO/updateChat.dto';
import { QuentionDocument, Question } from 'src/schema/question.schema';
import { User_Status } from 'src/constants';

@Injectable()
export class ChatService {
  constructor(
    private config:ConfigService,
    @InjectModel(Chat.name)
    private ChatModel: mongoose.Model<ChatDocument>,
  
    @InjectModel(Question.name)
    private QuestinModel: mongoose.Model<QuentionDocument>,
  
 
  ) {}
  async createRoom(data:CreateChatDto):Promise<Chat> {
   
    const res = await this.ChatModel.create({...data});
    const question = await this.QuestinModel.findByIdAndUpdate(
      data.roomId,
      { status: User_Status.INPROGRESS},
      { new: true }
    );

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

  async updateChatMessage(updateChatDto:UpdateChatDto,roomId:any) {
    const objectId = new mongoose.Types.ObjectId(roomId);
    console.log('roomIdkkk',updateChatDto)

    const updatedDocument = await this.ChatModel.findOneAndUpdate(
      { roomId: objectId },
      { $push: { messages:{...updateChatDto} } }, // Use $push to add a new element to the messages array
      { new: true },
    );

    return updatedDocument;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
