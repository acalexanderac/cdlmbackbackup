import { PartialType } from '@nestjs/mapped-types';
import { CreateCitaDto } from './create-cita.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCitaDto extends PartialType(CreateCitaDto) {
    @IsString()
    @IsOptional()
    fechaAgendado: Date;

    @IsOptional()
    @IsString()
    motivo: string;

    @IsOptional()
    @IsString()
    observaciones: string;

    @IsOptional()
    @IsString()
    paciente: string;
    
    @IsOptional()
    @IsString()
    dpi: string;

    @IsString()
    @IsOptional()
    horaAgendado: string;
}
