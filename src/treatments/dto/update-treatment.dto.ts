import { PartialType } from '@nestjs/mapped-types';
import { CreateTreatmentDto } from './create-treatment.dto';
import {  IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateTreatmentDto extends PartialType(CreateTreatmentDto) {

    
    @IsOptional()
    @IsString()
    fechaTratamiento?: string;

    @IsOptional()
        @IsString()
    tipoAnestesia?: string;

    @IsOptional()
    @IsBoolean()  
    anestesia?: boolean;

    @IsOptional()
        @IsString()
    observaciones?: string;

    @IsString()
    @IsOptional()
    patient: string;

    @IsOptional()
    @IsString()
    treatmentype: string;
}
