import { Type } from "class-transformer";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateCrioterapiaDto {

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
    @Type(() => Number)
    numeroCrioterapia: number;

    @IsOptional()
    @IsString()
    notasCrioterapia: string;

    @IsString()
    @IsOptional()
    observaciones: string;

    @IsString()
    paciente: string;
}
