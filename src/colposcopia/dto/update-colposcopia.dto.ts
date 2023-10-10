import { PartialType } from '@nestjs/mapped-types';
import { CreateColposcopiaDto } from './create-colposcopia.dto';

export class UpdateColposcopiaDto extends PartialType(CreateColposcopiaDto) {}
