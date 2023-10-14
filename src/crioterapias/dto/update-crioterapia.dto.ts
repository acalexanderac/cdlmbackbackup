import { PartialType } from '@nestjs/mapped-types';
import { CreateCrioterapiaDto } from './create-crioterapia.dto';
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateCrioterapiaDto extends PartialType(CreateCrioterapiaDto) {
    @IsOptional()
    @IsString()
    fechaCrioterapia: string;

       @IsOptional()
    @IsBoolean()
    cuadrantesuperiorizq: boolean;

    @IsOptional()
    @IsBoolean()
    cuadrantesuperiorder: boolean;
    
    @IsOptional()
    @IsBoolean()
    cuadranteinferiorizq: boolean;

    @IsOptional()
    @IsBoolean()
    cuadranteinferiorder: boolean;

    @IsOptional()
    @IsString()
    notascuadrantesuperiorizq: string;

    @IsOptional()
    @IsString()
    notascuadrantesuperiorder: string;

    @IsOptional()
    @IsString()
    notascuadranteinferiorizq: string;

    @IsOptional()
    @IsString()
    notascuadranteinferiorder: string;
    
    @IsOptional()
    @IsNumber()
    numeroCrioterapia: number;

    @IsOptional()
    @IsString()
    notasCrioterapia: string;

    @IsString()
    @IsOptional()
    observaciones: string;

    @IsOptional()
    @IsString()
    paciente: string;
}
