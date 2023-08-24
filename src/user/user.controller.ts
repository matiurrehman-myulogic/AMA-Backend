
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { createUserDto } from 'src/DTO/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post()
  async createUser(
    @Body()
    user: createUserDto,
  ): Promise<User> {
    return this.userService.create(user);
  }
}
