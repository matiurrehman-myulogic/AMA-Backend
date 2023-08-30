import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as moongose from 'mongoose';
import { Auth } from 'src/schema/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private AuthModel: moongose.Model<Auth>,
  ) {}
  async findAll(): Promise<Auth[]> {
    const user = await this.AuthModel.find();
    return user;
  }

  async create(user: Auth): Promise<Auth> {
    const res = await this.AuthModel.create(user);
    return res;
  }
}
