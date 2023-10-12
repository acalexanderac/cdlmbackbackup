import {IsBoolean, IsOptional, IsString} from "class-validator";

export class CreateCrioterapiaDto {

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

    @IsString()
    paciente: string;
}
