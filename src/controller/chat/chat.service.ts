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
import { ChatModule } from './chat.module';
import { ChatGateway } from './chat.gateway';

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
    private chatGateway: ChatGateway,

  ) {}
  async createRoom(data: CreateChatDto): Promise<Chat> {
    //  console.log('djfdkjf',data)
    const { roomId, questionerId, answererId } = data;

    // const roomId= new mongoose.Types.ObjectId(data.roomId);
    // const questionerId= new mongoose.Types.ObjectId(data.questionerId);
    // const answererId= new mongoose.Types.ObjectId(data.answererId);
    console.log('nextt', data);
    console.log(answererId);
    const res = await this.ChatModel.create({
      roomId: new mongoose.Types.ObjectId(data.roomId), // Convert the string to ObjectId
      questionerId: new mongoose.Types.ObjectId(data.questionerId), // Convert the string to ObjectId
      answererId: new mongoose.Types.ObjectId(data.answererId), // Convert the string to ObjectId
    });
    console.log(res);
    const question = await this.QuestinModel.findByIdAndUpdate(
      roomId,
      {
        status: User_Status.INPROGRESS,
        answererId: new mongoose.Types.ObjectId(data.answererId),
      },
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

      console.log(userDetail.questionerId);
      console.log(userDetail.answererId);
      const questionerId = new mongoose.Types.ObjectId(userDetail.questionerId);
      const answererId = new mongoose.Types.ObjectId(userDetail.answererId);

      const answererDetail = await this.AuthModel.findById(answererId);
      const questionerDetail = await this.AuthModel.findById(questionerId);

      const questionDetail = await this.QuestinModel.findOne({
        _id: objectId,
      });

      if (!userDetail && !questionDetail) {
        console.log('Both userDetail and questionDetail not found.');
      }

      console.log('userDetail', userDetail);
      console.log('questionDetail', questionDetail);
      const result = await this.ChatModel.aggregate(pipeline);
      console.log('pipelin', result);
      return {
        userDetail,
        question: questionDetail?.question,
        answererDetail,
        questionerDetail,
      };
    } catch (error) {
      console.error('Error in findChatroom:', error);
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  async updateChatMessage(userId, updateChatDto: UpdateChatDto, roomId: any) {
    const objectId = new mongoose.Types.ObjectId(roomId);
    let updatedDocument: ChatDocument | null;

    const Chatroom = await this.ChatModel.findOne({
      roomId: objectId,
    });



     if (userId ===Chatroom.questionerId) {
       updatedDocument = await this.ChatModel.findOneAndUpdate(
        { roomId: objectId },
        {
          $push: { messages: { ...updateChatDto, createdAt: Date.now() } },
          $inc: { answerer_unseenCount: 1 }, 
        },
        { new: true },
      );
    } else {
       updatedDocument = await this.ChatModel.findOneAndUpdate(
        { roomId: objectId },
        {
          $push: { messages: { ...updateChatDto, createdAt: Date.now() } },
          $inc: {questioner_unseenCount : 1 }, 
        },
        { new: true },
      );
    }

    // const updatedDocument = await this.ChatModel.findOneAndUpdate(
    //   { roomId: objectId },
    //   { $push: { messages: { ...updateChatDto, createdAt: Date.now() } } }, // Use $push to add a new element to the messages array
    //   { new: true },
    // );

    //push notification code starts here
    const id = new mongoose.Types.ObjectId(updateChatDto.senderId);
    const userToNotifyId =
      id === updatedDocument.answererId
        ? updatedDocument.questionerId
        : updatedDocument.answererId;
    const userDetail = await this.AuthModel.findOne({
      _id: userToNotifyId,
    });
    const title = 'Response from your Active Chat';
    const message = `You got a new chat response `;
    console.log('notifcationnnnn', userToNotifyId);
    await this.firebaseApp.sendPushNotification(
      userDetail.FCM,
      title,
      updateChatDto.message,
    );
    console.log('updateddd', updatedDocument);
    return updatedDocument;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  async findInProgressChatroom(id: string) {
    const userId = new mongoose.Types.ObjectId(id);
    const data = await this.ChatModel.aggregate([
      {
        $match: {
          $or: [{ questionerId: userId }, { answererId: userId }],
        },
      },
      {
        $lookup: {
          from: 'questions', // Replace with the actual name of your questions collection
          localField: 'roomId',
          foreignField: '_id',
          as: 'question',
        },
      },
      {
        $unwind: '$question', // Unwind the resulting array from the $lookup stage
      },
      {
        $match: {
          'question.status': 'INPROGRESS',
        },
      },
      {
        $project: {
          _id: 1, // Include the "_id" field
          roomId: 1, // Include the "roomId" field
          questionerId: 1, // Include the "questioner" field
          answererId: 1, // Include the "answerer" field
          messages: 1, // Include the "text" field from the embedded "question" document
          'question.status': 1,
          'question.pic': 1,
          'question.question': 1,
        },
      },
    ]);

    console.log('inprogress chat', data);
    return data;
  }

  async addResponseToQuestion(id: string) {
    const userId = new mongoose.Types.ObjectId(id);

    const data = await this.QuestinModel.aggregate([
      {
        $match: {
          answererId: userId,
          answer: { $exists: false },
          status: 'CLOSE',
        },
      },
      {
        $sort: {
          createdAt: -1, // Sort by "createdAt" in descending order
        },
      },
    ]);

    console.log(data);
    return data;
  }

  async ResetSeenCount(userId,roomId: string) {
    const objectId = new mongoose.Types.ObjectId(roomId);
    let updatedDocument: ChatDocument | null;

  //  updatedDocument = await this.ChatModel.findOneAndUpdate(
  //     { roomId: objectId },
  //     { questioner_unseenCount: 0 }, // Set questioner_unseenCount to 0
  //     { new: true }
  // );

  const Chatroom = await this.ChatModel.findOne({
    roomId: objectId,
  });
  if (userId ===Chatroom.questionerId) {
     updatedDocument = await this.ChatModel.findOneAndUpdate(
      { roomId: objectId },
      {
         questioner_unseenCount: 0 ,

      },
      { new: true },
    );
  } else {
     updatedDocument = await this.ChatModel.findOneAndUpdate(
      { roomId: objectId },
      {
        answerer_unseenCount: 0 ,

      },
      { new: true },
    );
  }






  }

}