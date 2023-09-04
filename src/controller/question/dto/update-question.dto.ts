import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from 'src/DTO/create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
