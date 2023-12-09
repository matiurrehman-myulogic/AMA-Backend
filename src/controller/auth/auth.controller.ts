import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { AuthService } from './auth.service';
import { Auth } from 'src/schema/auth.schema';
import { createUserDto } from 'src/DTO/createUser.dto';
import { userExistsDto } from './../../DTO/userExists.dto';
import { AddFCMtokenDto } from 'src/DTO/add-FCM.dto';
import { addCreditdto } from 'src/DTO/add-credits.dto';

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
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('GetAllQuestions')
  async GetAllQuestions(
    @Req() req: any
  ): Promise<Auth> {
    console.log("innnnnnnnnnnn")
    return this.userService.getAllUserQuestion(req.payload.id);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('getAllUserAnsweredQuestion')
  async getAllUserAnsweredQuestion(
    @Req() req: any
  ): Promise<Auth> {
    console.log("innnnnnnnnnnn")
    return this.userService.getAllUserAnsweredQuestion(req.payload.id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('getCredits')
  async getCredits(
    @Req() req: any,
    @Query('page') page: number = 1,@Query('limit') limit: number = 10
  ): Promise<Auth> {
    console.log("innnnnnnnnnnn",page,limit)
    return this.userService.getCredits(req.payload.id,page,limit);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Patch('addCredits')
  async addCredits(
    @Req() req: any,
    @Body()Credits:addCreditdto
  ): Promise<Auth> {
    console.log("innnnnnnnnnnn")
    return this.userService.addCredits(req.payload.id,Credits);
  }
}
