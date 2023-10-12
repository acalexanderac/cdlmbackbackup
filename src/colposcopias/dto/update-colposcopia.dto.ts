import { PartialType } from '@nestjs/mapped-types';
import { CreateColposcopiaDto } from './create-colposcopia.dto';
import {IsOptional, IsString} from "class-validator";

export class UpdateColposcopiaDto extends PartialType(CreateColposcopiaDto) { 

    @IsOptional()     
    @IsString()
    fechaColposcopia: string;

    @IsOptional()
    @IsString()
        resultadoBiopsiacervix: string;


    @IsOptional()
    @IsString()
    dpi: string;

    @IsString()
    @IsOptional()
    observaciones: string;

    @IsString()
    @IsOptional()
    paciente: string;
}
