import {IsBoolean, IsOptional, IsString} from "class-validator";

export class CreateColposcopiaDto {
     @IsString()
    fechaColposcopia: string;

    @IsOptional()
    @IsString()
        resultadoBiopsiacervix: string;

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

    @IsString()
    dpi: string;

    @IsString()
    @IsOptional()
    observaciones: string;

    @IsString()
    paciente: string;
}
