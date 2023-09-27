import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as moongose from 'mongoose';
import { createUserDto } from 'src/DTO/createUser.dto';
import { userExistsDto } from 'src/DTO/userExists.dto';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import { ObjectId } from 'mongoose'; // Import ObjectId from mongoose
import { AddFCMtokenDto } from 'src/DTO/add-FCM.dto';

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
  async checkIfPhoneNumberExists(phoneNumber: string): Promise<boolean> {
    const user = await this.AuthModel.findOne({ Phone_Number: phoneNumber }).exec();
    return !!user; // If user is found, return true; otherwise, return false
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
  async updateProfile(id:moongose.Types.ObjectId,updatedDATA: createUserDto): Promise<Auth>   {
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
  async addFCM(id:moongose.Types.ObjectId,updatedDATA:AddFCMtokenDto): Promise<Auth>   {
   console.log("lll",id,updatedDATA)
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

  }


