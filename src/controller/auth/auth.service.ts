import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, * as moongose from 'mongoose';
import { createUserDto } from 'src/DTO/createUser.dto';
import { userExistsDto } from 'src/DTO/userExists.dto';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import { ObjectId } from 'mongoose'; // Import ObjectId from mongoose
import { AddFCMtokenDto } from 'src/DTO/add-FCM.dto';
import { QuentionDocument, Question } from 'src/schema/question.schema';
import {
  Transaction,
  TransactionDocument,
} from 'src/schema/transaction.schema';
import { Transaction_Status } from 'src/constants/TransactionStatus';
import { addCreditdto } from 'src/DTO/add-credits.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private AuthModel: moongose.Model<AuthDocument>,
    @InjectModel(Question.name)
    private QuestionModel: moongose.Model<QuentionDocument>,
    @InjectModel(Transaction.name)
    private TransactionModel: moongose.Model<TransactionDocument>,
  ) {}
  async findAll(): Promise<Auth[]> {
    console.log('users');
    const user = await this.AuthModel.find();
    return user;
  }
  async checkIfPhoneNumberExists(phoneNumber: string): Promise<boolean> {
    const user = await this.AuthModel.findOne({
      Phone_Number: phoneNumber,
    }).exec();
    return !!user; // If user is found, return true; otherwise, return false
  }

  async findById(id: moongose.Types.ObjectId) {
    console.log('kl', id);
    // Convert the string to ObjectId
    // Convert the string to ObjectId

    const userDetail = await this.AuthModel.findOne({
      _id: id,
    });
    console.log('ussseerr', userDetail);
    return userDetail;
  }

  async create(user: createUserDto): Promise<Auth> {
    const userPresent = await this.AuthModel.findOne({
      Phone_Number: user.Phone_Number,
    });
    if (userPresent) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    } else {
      const res = await this.AuthModel.create(user);
      const status = await this.TransactionModel.create({ userId: res._id });
      //

      const statusUpdate = await this.TransactionModel.findOneAndUpdate(
        { userId: res._id },
        {
          $push: {
            Transactions: {
              Date: new Date(),
              status: Transaction_Status.AWARD,
              amount: 10,
              description: 'Initial registration transaction',
            },
          },
        },
        { new: true },
      );
      return res;
    }
  }
  async updateProfile(
    id: moongose.Types.ObjectId,
    updatedDATA: createUserDto,
  ): Promise<Auth> {
    try {
      const user = await this.AuthModel.findByIdAndUpdate(id, updatedDATA, {
        new: true,
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
  async addFCM(
    id: moongose.Types.ObjectId,
    updatedDATA: AddFCMtokenDto,
  ): Promise<Auth> {
    console.log('lll', id, updatedDATA);
    try {
      const user = await this.AuthModel.findByIdAndUpdate(id, updatedDATA, {
        new: true,
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
  async getAllUserQuestion(id: mongoose.Types.ObjectId): Promise<any> {
    const userQuestions = await this.QuestionModel.find({ userId: id }).exec();
    console.log(userQuestions);
    const finalResult = {
      Question: [...userQuestions],
    };
    return finalResult;
  }
  async getAllUserAnsweredQuestion(id: mongoose.Types.ObjectId): Promise<any> {
    const userPoints = await this.AuthModel.findById(
      id,
      'Points FullName ProfilePic -_id',
    ).exec();
    const userQuestions = await this.QuestionModel.find({
      answererId: id,
    }).exec();
    console.log(userQuestions);
    const finalResult = {
      Question: [...userQuestions],
      Details: userPoints,
    };
    console.log('finaaaaa', finalResult);
    return finalResult;
  }
  async getCredits(id: mongoose.Types.ObjectId,pageNumber:number,pageSize:number): Promise<any> {
    const userPoints = await this.AuthModel.findById(id, 'Points -_id').exec(); 
    const transactionsAggregate = await this.TransactionModel.aggregate([
      { $match: { userId: id } }, // Match the document
      {
        $project: {
          Transactions: {
            $slice: [
              {
                $sortArray: {
                  input: '$Transactions',
                  sortBy: { Date: -1 }, // Sorting in descending order
                },
              },
              (pageNumber - 1) * pageSize, // Skip
              pageSize, // Limit
            ],
          },
        },
      },
    ]);

    const transactions = transactionsAggregate[0]?.Transactions || [];
    const payloadfinal = {
      Points: userPoints.Points,
      Credits: transactions,
    };
    console.log("finalllll",pageNumber,pageSize,payloadfinal)
    return payloadfinal;
  }

  async addCredits(
    id: moongose.Types.ObjectId,
    credits: addCreditdto,
  ): Promise<any> {
    const user = await this.AuthModel.findByIdAndUpdate(
      id,
      { Points: credits.Points },
      {
        new: true,
      },
    );

    const statusUpdate = await this.TransactionModel.findOneAndUpdate(
      { userId: user._id },
      {
        $push: {
          Transactions: {
            Date: new Date(),
            status: Transaction_Status.ADDED,
            amount: credits.Points,
            description: 'Credits added to your account',
          },
        },
      },
      { new: true },
    );
  }
}
