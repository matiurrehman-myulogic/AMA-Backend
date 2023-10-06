import { PartialType } from '@nestjs/swagger';
import { createUserDto } from './createUser.dto';

export class UpdateUserDTO extends PartialType(createUserDto) {}
