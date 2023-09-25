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
    private config: ConfigService,
    @InjectModel(Chat.name)
    private ChatModel: mongoose.Model<ChatDocument>,

    @InjectModel(Question.name)
    private QuestinModel: mongoose.Model<QuentionDocument>,
  ) {}
  async createRoom(data: CreateChatDto): Promise<Chat> {
    //  console.log('djfdkjf',data)
    const { roomId, questionerId, answererId } = data;

    // const roomId= new mongoose.Types.ObjectId(data.roomId);
    // const questionerId= new mongoose.Types.ObjectId(data.questionerId);
    // const answererId= new mongoose.Types.ObjectId(data.answererId);
    console.log(answererId);
    const res = await this.ChatModel.create({
      roomId: new mongoose.Types.ObjectId(data.roomId), // Convert the string to ObjectId
      questionerId: new mongoose.Types.ObjectId(data.questionerId), // Convert the string to ObjectId
      answererId: new mongoose.Types.ObjectId(data.answererId), // Convert the string to ObjectId
    });
    console.log(res);
    const question = await this.QuestinModel.findByIdAndUpdate(
      roomId,
      { status: User_Status.INPROGRESS },
      { new: true },
    );

    return res;
  }

  // async findChatroom(id: string) {
  //   const objectId = new mongoose.Types.ObjectId(id);

  //   const userDetail = await this.ChatModel.findOne({
  //     roomId: objectId,
  //   });
  //   const questionDetail = await this.QuestinModel.findOne({
  //     _id: objectId
  //   });
  //   console.log('ussseerr', userDetail);

  //   return userDetail;
  // }
  async findChatroom(id: string) {
    try {
      const objectId = new mongoose.Types.ObjectId(id);

      const userDetail = await this.ChatModel.findOne({
        roomId: objectId,
      });
      const questionDetail = await this.QuestinModel.findOne({
        _id: objectId,
      });

      if (!userDetail && !questionDetail) {
        console.log('Both userDetail and questionDetail not found.');
      }

      console.log('userDetail', userDetail);
      console.log('questionDetail', questionDetail);

      return {
        userDetail,
        question: questionDetail?.question,
      };
    } catch (error) {
      console.error('Error in findChatroom:', error);
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  async updateChatMessage(updateChatDto: UpdateChatDto, roomId: any) {
    const objectId = new mongoose.Types.ObjectId(roomId);
    console.log('iddddddddd', objectId);
    console.log('roomIdkkk', updateChatDto);
console.log("dateee",Date.now())
    const updatedDocument = await this.ChatModel.findOneAndUpdate(
      { roomId: objectId },
      { $push: { messages: { ...updateChatDto,createdAt:Date.now() } } }, // Use $push to add a new element to the messages array
      { new: true },
    );
    console.log('updateddd', updatedDocument);
    return updatedDocument;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
