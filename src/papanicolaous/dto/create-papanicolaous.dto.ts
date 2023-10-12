import {IsOptional, IsString} from "class-validator";

export class CreatePapanicolaousDto {
     @IsString()
    fechaPapanicolaous: string;

    @IsOptional()
    @IsString()
        resultadoPapanicolaous: string;


    @IsString()
    dpi: string;

    @IsString()
    @IsOptional()
    observaciones: string;

    @IsString()
    paciente: string;
}
