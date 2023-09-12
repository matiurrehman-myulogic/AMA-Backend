import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as moongose from 'mongoose';
import { createUserDto } from 'src/DTO/createUser.dto';
import { userExistsDto } from 'src/DTO/userExists.dto';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import { ObjectId } from 'mongoose'; // Import ObjectId from mongoose

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private AuthModel: moongose.Model<AuthDocument>,
  ) {}
  async findAll(): Promise<Auth[]> {
    const user = await this.AuthModel.find();
    return user;
  }

  async userExists(user: any): Promise<string> {
    const userPresent = await this.AuthModel.findOne({
      Phone_Number: user.Phone_Number,
    });
    if (userPresent) {
      return 'User exists';
    } else {
      return 'User not exists';
    }
  }

  async findById(id:moongose.Types.ObjectId)  {
    console.log("kl",id)
 // Convert the string to ObjectId
 // Convert the string to ObjectId

    const userDetail = await this.AuthModel.findOne({
      _id:id
    })
  console.log("ussseerr",userDetail)
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
      return res;
    }
  }
}
