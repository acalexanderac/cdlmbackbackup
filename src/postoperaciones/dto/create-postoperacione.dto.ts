import {IsOptional, IsString} from "class-validator";

export class CreatePostoperacioneDto {
     @IsString()
    fechaPostop: string;

    @IsOptional()
    @IsString()
        anotacionesCirugia: string;

@IsOptional()
    @IsString()
tipoCirugia: string;
    
    @IsString()
    dpi: string;

    @IsString()
    @IsOptional()
    observaciones: string;

    @IsString()
    paciente: string;
}
