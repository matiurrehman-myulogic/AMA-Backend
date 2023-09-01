import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from '../DTO/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from 'src/schema/question.schema';

import * as mongoose from 'mongoose';
import { Auth } from 'src/schema/auth.schema';
@Injectable()
export class QuestionService {

  constructor(
    @InjectModel(Question.name)
    private QuestionModel: mongoose.Model<Question>,
 
  ) {}

  async create({user_id,data}): Promise<Question> {

      const res = await this.QuestionModel.create({...data,user_id});
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

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
