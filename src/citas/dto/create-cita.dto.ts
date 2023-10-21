import {  IsOptional, IsString } from 'class-validator';
export class CreateCitaDto {
    @IsString()
    fechaAgendado: Date;

    @IsOptional()
    @IsString()
    motivo: string;

    @IsOptional()
    @IsString()
    observaciones: string;

    
    @IsString()
    paciente: string;
    
    
    @IsString()
    dpi: string;

    @IsString()
    horaAgendado: string;
 }
