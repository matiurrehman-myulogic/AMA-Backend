import { Injectable } from '@nestjs/common';

import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question ,QuentionDocument} from 'src/schema/question.schema';

import * as mongoose from 'mongoose';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
@Injectable()
export class QuestionService {

  constructor(
    @InjectModel(Question.name)
    private QuestionModel: mongoose.Model<QuentionDocument>,
    @InjectModel(Auth.name)
    private UserModel: mongoose.Model<AuthDocument>,

 
  ) {}

  async create({userId,data}): Promise<Question> {

      const res = await this.QuestionModel.create({...data,userId, likes:0});
      return res;
    
  }

  async findAll() {
    try {
      const user = await this.QuestionModel.find();
      console.log(user);
  
      if (user) {
        const filteredData = await Promise.all(user.map(async (item:any) => {
          const id = item.userId;
          const userPresent = await this.UserModel.findOne({ _id: id });
          console.log("userrr", userPresent);
  
          return {
            ProfilePic: userPresent.ProfilePic,
            FullName: userPresent.FullName,
            question: {
              ...item._doc,
            },
          };
        }));
  
        console.log("filtered", filteredData);
        return filteredData;
      }
  
      return []; // Return an empty array if no data is found
    } catch (error) {
      console.error('Error while Fetching venue list:', error.message);
      throw error;
    }
  }
  async updateLikesDecrement(id:string){
    const userPresent = await this.QuestionModel.findOne({ _id: id });
    console.log(userPresent)

  }
  updateLikesIncrement(id:string)
  {

  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, UpdateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
