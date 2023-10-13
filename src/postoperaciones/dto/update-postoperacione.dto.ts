import { PartialType } from '@nestjs/mapped-types';
import { CreatePostoperacioneDto } from './create-postoperacione.dto';
import {IsOptional, IsString} from "class-validator";

export class UpdatePostoperacioneDto extends PartialType(CreatePostoperacioneDto) {
    @IsOptional() 
    @IsString()
    fechaPostop: string;

    @IsOptional()
    @IsString()
        anotacionesCirugia: string;

@IsOptional()
    @IsString()
tipoCirugia: string;
    
    @IsOptional()
    @IsString()
    dpi: string;

    @IsString()
    @IsOptional()
    observaciones: string;

    @IsOptional()
    @IsString()
    paciente: string;
}
