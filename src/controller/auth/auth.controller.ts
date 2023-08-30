import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';




import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { AuthService } from './auth.service';
import { Auth } from 'src/schema/auth.schema';
import { createUserDto } from 'src/DTO/createUser.dto';

@Controller('auth')

export class AuthController {
  constructor(private userService: AuthService) {}
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
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
