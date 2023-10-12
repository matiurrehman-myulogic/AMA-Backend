import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, MiddlewareConsumer } from '@nestjs/common';
import { QuestionService } from './question.service';

import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from 'src/DTO/create-question.dto';
import { AuthGuard } from 'src/AuthGuard/authGuard';
import { UserPointsMiddleware } from './../../Middlewares/user-points.middleware';
import { addReponseDTO } from 'src/DTO/addResponse.dto';
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('Question')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
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

  @Get('/unAnswered')
  unAnsweredQUestions() {
    return this.questionService.unAnsweredQuestions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findById(id);
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
  @Patch('CloseCall/:id')
closeCall(
    @Param('id') id: string,
  ) {
    return this.questionService.CloseQuestion(id);
  }
  @Patch('AddResponse/:id')
  AddResponse (@Body() addResponseDTO: addReponseDTO,
    @Param('id') id: string,
  ) {
    return this.questionService.AddResponse(id,addResponseDTO);
  
  }

  
  @Get(':id')
  findInProgresschats(@Param('id') id: string) {
    return this.questionService.findInProgressChat(id);
  }
  @Get()
  findClosedCall() {
    return this.questionService.findClosedQuestion();
  }
}