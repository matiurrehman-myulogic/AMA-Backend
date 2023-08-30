import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {}



import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { AuthService } from './auth.service';
import { Auth } from 'src/schema/auth.schema';
import { createUserDto } from 'src/DTO/createUser.dto';
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@Controller('auth')
export class UserController {
  constructor(private userService: AuthService) {}

  @Get('users')
  async getAllUsers(): Promise<Auth[]> {
    return this.userService.findAll();
  }
  @Post('register')
  async createUser(
    @Body()
    user: createUserDto,
  ): Promise<Auth> {
    return this.userService.create(user);
  }
}
