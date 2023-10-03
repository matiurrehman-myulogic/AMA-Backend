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
import { FirebaseApp } from 'src/database/firebase-app';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import { pipeline } from 'src/Pipeline/chat-pipeline';

@Injectable()
export class ChatService {
  constructor(
    private config: ConfigService,
    @InjectModel(Auth.name)
    private AuthModel: mongoose.Model<AuthDocument>,
    @InjectModel(Chat.name)
    private ChatModel: mongoose.Model<ChatDocument>,

    @InjectModel(Question.name)
    private QuestinModel: mongoose.Model<QuentionDocument>,
    private firebaseApp: FirebaseApp,
  ) {}
  async createRoom(data: CreateChatDto): Promise<Chat> {
    //  console.log('djfdkjf',data)
    const { roomId, questionerId, answererId } = data;

    // const roomId= new mongoose.Types.ObjectId(data.roomId);
    // const questionerId= new mongoose.Types.ObjectId(data.questionerId);
    // const answererId= new mongoose.Types.ObjectId(data.answererId);
    console.log("nextt",data)
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

    const userPresent = await this.AuthModel.findById(questionerId);
    //fcm
    const title = 'You have a Chat request';
    const message = `Someone wants to answer your question`;
    await this.firebaseApp.sendPushNotification(
      userPresent.FCM,
      title,
      message,
    );
    //fcm
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
      const result = await this.ChatModel.aggregate(pipeline);
      console.log("pipelin",result)
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

    const updatedDocument = await this.ChatModel.findOneAndUpdate(
      { roomId: objectId },
      { $push: { messages: { ...updateChatDto, createdAt: Date.now() } } }, // Use $push to add a new element to the messages array
      { new: true },
    );

    // const chatDetail = await this.ChatModel.findOne({
    //   roomId: objectId,
    // });

    const userToNotifyId =
      new mongoose.Types.ObjectId(updateChatDto.senderId) ===
      updatedDocument.answererId
        ? updatedDocument.questionerId
        : updatedDocument.answererId;
    const userDetail = await this.AuthModel.findOne({
      _id: userToNotifyId,
    });
    const title = 'New notification';
    const message = `You got a new chat response `;

    await this.firebaseApp.sendPushNotification(userDetail.FCM, title, message);
    console.log('updateddd', updatedDocument);
    return updatedDocument;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
