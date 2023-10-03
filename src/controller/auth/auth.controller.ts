import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { AuthService } from './auth.service';
import { Auth } from 'src/schema/auth.schema';
import { createUserDto } from 'src/DTO/createUser.dto';
import { userExistsDto } from './../../DTO/userExists.dto';
import { AddFCMtokenDto } from 'src/DTO/add-FCM.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Get('sample')
  sample() {
    console.log('uData');
    // return this.userService.create(user);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('users')
  async getAllUsers(): Promise<Auth[]> {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('userById')
  async findById(@Req() req: any) {
    console.log('olp', req.payload.id);
    return this.userService.findById(req.payload.id);
  }

  @Post('register')
  async createUser(
    @Body()
    user: createUserDto,
  ): Promise<Auth> {
    console.log('uData', user);
    return this.userService.create(user);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('FCM')
  async addFCM(
    @Req() req: any,
    @Body()
    fcm: AddFCMtokenDto,
  ): Promise<Auth> {
    console.log('uData', fcm);
    return this.userService.addFCM(req.payload.id, fcm);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Patch('updateProfile')
  async updateProfile(
    @Req() req: any,
    @Body()
    user: createUserDto,
  ): Promise<Auth> {
    return this.userService.updateProfile(req.payload.id, user);
  }

  @Post('/checkPhoneNumber')
  async checkPhoneNumber(
    @Body() userExistsDto: userExistsDto,
  ): Promise<{ exists: boolean }> {
    console.log('oooooi');
    const exists = await this.userService.checkIfPhoneNumberExists(
      userExistsDto.Phone_Number,
    );
    return { exists };
  }
}
