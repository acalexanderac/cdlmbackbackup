import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentypeDto } from './create-treatmentype.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTreatmentypeDto extends PartialType(CreateTreatmentypeDto) {
    @IsString()
         @IsOptional()
    name: string;
}
