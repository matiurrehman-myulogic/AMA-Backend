import { Injectable } from '@nestjs/common';

import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuentionDocument } from 'src/schema/question.schema';

import * as mongoose from 'mongoose';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { User_Status } from 'src/constants';
import { FirebaseApp } from 'src/database/firebase-app';
@Injectable()
export class QuestionService {
  constructor(
    private config: ConfigService,
    @InjectModel(Question.name)
    private QuestionModel: mongoose.Model<QuentionDocument>,
    @InjectModel(Auth.name)
    private UserModel: mongoose.Model<AuthDocument>,
  ) {}

  async create({ userId, data }): Promise<Question> {
    // const apiKey = this.config.get<string>('GOOGLE_MAPS_API_KEY');
    // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.Location.Latitude},${data.Location.Longitude}&key=${apiKey}`;

    // try {
    //   const response = await axios.get(apiUrl);
    //   return response.data.results[0]; // Return the first result (usually the most accurate)

    // } catch (error) {
    //   throw new Error('Failed to retrieve location data.');
    // }
    console.log('points', data);

    const updatedUser = await this.UserModel.findOneAndUpdate(
      { _id: userId },
      { $inc: { Points: -2 } }, // Use $inc to decrement the Points field by 2
      { new: true }, // To return the updated document
    );

    const res = await this.QuestionModel.create({ ...data, userId, likes: 0 });
    return res;
  }

  async findAll() {
    try {
      const user = await this.QuestionModel.find();
      console.log("ghghghghg",user);

      if (user) {
        const filteredData = await Promise.all(
          user.map(async (item: any) => {
            const id = item.userId;
            console.log('vjevk', id);
            const userPresent = await this.UserModel.findOne({ _id: id });
            console.log('userrr', userPresent);

            return {
              ProfilePic: userPresent.ProfilePic,
              FullName: userPresent.FullName,
              question: {
                ...item._doc,
              },
            };
          }),
        );

        console.log('filtered', filteredData);
        return filteredData;
      }

      return []; // Return an empty array if no data is found
    } catch (error) {
      console.error('Error while Fetching venue list:', error.message);
      throw error;
    }
  }
  async unAnsweredQuestions() {
    try {
      const user = await this.QuestionModel.find({ status: User_Status.OPEN });
      console.log("lllll",user);

      if (user) {
        const filteredData = await Promise.all(
          user.map(async (item: any) => {
            const id = item.userId;
            const userPresent = await this.UserModel.findOne({ _id: id });
            console.log('userrrffffff', userPresent);

            return {
              ProfilePic: userPresent.ProfilePic,
              FullName: userPresent.FullName,
              question: {
                ...item._doc,
              },
            };
          }),
        );

        console.log('filtered', filteredData);
        return filteredData;
      }

      return []; // Return an empty array if no data is found
    } catch (error) {
      console.error('Error while Fetching venue list:', error.message);
      throw error;
    }
  }

  async updateLikesDecrement(id: string) {
    const userPresent = await this.QuestionModel.findOne({ _id: id });
    console.log(userPresent);
  }
  updateLikesIncrement(id: string) {}

  async findById(id: string) {
    console.log('kl', id);
    // Convert the string to ObjectId
    // Convert the string to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);
    const questionDetails = await this.QuestionModel.findOne({
      _id: objectId,
    });
    console.log('ussseerr', questionDetails);
    return questionDetails;
  }
  update(id: number, UpdateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
