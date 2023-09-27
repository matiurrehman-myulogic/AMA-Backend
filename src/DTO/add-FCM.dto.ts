import { PartialType } from '@nestjs/swagger';
import { createUserDto } from './createUser.dto';

export class AddFCMtokenDto extends PartialType(createUserDto) {}
