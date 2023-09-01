import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from '../DTO/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Question')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('add')

  create(@Body() createQuestionDto: CreateQuestionDto,  @Req() req: any) {
    return this.questionService.create({
      data:createQuestionDto,
      user_id:req.id
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
