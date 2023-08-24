
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as moongose from 'mongoose'
import { User } from './schemas/user.schema';
@Injectable()
export class UserService {
constructor(

    @InjectModel(User.name)
    private BookModel:moongose.Model<User>
){}
async findAll():Promise<User[]>{
const user=await this.BookModel.find()
return user;
}


async create(user:User):Promise<User>{
    const res=await this.BookModel.create(user)
    return res;
}
}
