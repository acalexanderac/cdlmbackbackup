import { PartialType } from '@nestjs/mapped-types';
import { CreateCrioterapiaDto } from './create-crioterapia.dto';
import {IsBoolean, IsOptional, IsString} from "class-validator";

export class UpdateCrioterapiaDto extends PartialType(CreateCrioterapiaDto) {
    @IsOptional()
    @IsString()
    fechaCrioterapia: string;

    @IsOptional()
    @IsBoolean()
    anestesia: boolean;

    @IsOptional()
    @IsString()
    tipoAnestesia: string;

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
