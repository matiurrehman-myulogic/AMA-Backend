import { Injectable } from '@nestjs/common';

import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question ,QuentionDocument} from 'src/schema/question.schema';

import * as mongoose from 'mongoose';
import { Auth } from 'src/schema/auth.schema';
@Injectable()
export class QuestionService {

  constructor(
    @InjectModel(Question.name)
    private QuestionModel: mongoose.Model<QuentionDocument>,
 
  ) {}

  async create({userId,data}): Promise<Question> {

      const res = await this.QuestionModel.create({...data,userId});
      return res;
    
  }

  async findAll() {
    const user = await this.QuestionModel.find()



    
    
    ;
    return user;
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
