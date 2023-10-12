import { PartialType } from '@nestjs/mapped-types';
import { CreatePapanicolaousDto } from './create-papanicolaous.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePapanicolaousDto extends PartialType(CreatePapanicolaousDto) {
        @IsOptional()     
    @IsString()
    fechaPapanicolaous: string;

    @IsOptional()
    @IsString()
        resultadoPapanicolaous: string;


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
