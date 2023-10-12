import {IsOptional, IsString} from "class-validator";

export class CreateColposcopiaDto {
     @IsString()
    fechaColposcopia: string;

    @IsOptional()
    @IsString()
        resultadoBiopsiacervix: string;


    @IsString()
    dpi: string;

    @IsString()
    @IsOptional()
    observaciones: string;

    @IsString()
    paciente: string;
}
