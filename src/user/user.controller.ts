
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { createUserDto } from 'src/DTO/createUser.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
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
