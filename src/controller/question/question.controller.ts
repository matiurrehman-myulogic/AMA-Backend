import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';

import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from 'src/DTO/create-question.dto';
import { AuthGuard } from 'src/AuthGuard/authGuard';
// @UseGuards(AuthGuard)
// @ApiBearerAuth('JWT')
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
      userId:req.id
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
