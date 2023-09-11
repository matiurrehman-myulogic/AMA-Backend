import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, , UseMiddle } from '@nestjs/common';
import { QuestionService } from './question.service';

import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from 'src/DTO/create-question.dto';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { UserPointsMiddleware } from './../../Middlewares/user-points.middleware';
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('Question')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
// @UseGuards(AuthGuard)
// @ApiBearerAuth('JWT')
  @Post('add')
  create(@Body() createQuestionDto: CreateQuestionDto,  @Req() req: any) {
    
    return this.questionService.create({
      data:createQuestionDto,
      userId:req.payload.id,
     
    });
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch('/likesIncrement')
  updateLikesIncrement(@Param('id') id: string) {
    return this.questionService.updateLikesIncrement(id);
  }
  @Patch('/likesDecrement')
  updateLikesDecrement(@Param('id') id: string) {
    return this.questionService.updateLikesDecrement(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
