import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from '../../DTO/create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
