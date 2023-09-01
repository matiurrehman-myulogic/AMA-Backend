import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';




import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { AuthService } from './auth.service';
import { Auth } from 'src/schema/auth.schema';
import { createUserDto } from 'src/DTO/createUser.dto';
import { userExistsDto } from './../../DTO/userExists.dto';
@ApiTags('Auth')

@Controller('auth')

export class AuthController {
  constructor(private userService: AuthService) {}
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('users')
  async getAllUsers(): Promise<Auth[]> {
    return this.userService.findAll();
  }
  @Get('userById')

  async findById (@Req() req:any) {

    
    return this.userService.findById(req.payload.id);
  }
  @Post('check-user')
  async chechUser(
    @Body()
    user: userExistsDto,
  ): Promise<string> {
    console.log('uData',user)
    return this.userService.userExists(user);
  }

  @Post('register')
  async createUser(
    @Body()
    user: createUserDto,
  ): Promise<Auth> {
    console.log('uData',user)
    return this.userService.create(user);
  }
}
