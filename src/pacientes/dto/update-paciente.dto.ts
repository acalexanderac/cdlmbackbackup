import { PartialType } from '@nestjs/mapped-types';
import { CreatePacienteDto } from './create-paciente.dto';
import {IsInt, IsOptional, IsPositive, IsString} from "class-validator";

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {

    @IsString()
    @IsOptional()

    nombrePaciente: string;

    @IsString()
    @IsOptional()

    docIdentificacion: string;

    @IsInt()
    @IsPositive()
    @IsOptional()

    edadPaciente: number;

    @IsString()
    @IsOptional()
    direccion: string;


    @IsString()
    @IsOptional()
    estadoCivil: string;

    @IsString()
    @IsOptional()
    noIggs: string;

    @IsString()
    @IsOptional()
    aseguradora: string;

    @IsString()
    @IsOptional()
    telefonoContacto: string;

    @IsString()
    @IsOptional()
    religion: string;


    @IsString()
    @IsOptional()
    fechaNacimiento: Date;

    @IsString()
    @IsOptional()
    contacto1:string;

    @IsString()
    @IsOptional()
    telContacto1:string;

    @IsString()
    @IsOptional()
    contacto2:string;

    @IsString()
    @IsOptional()
    telContacto2:string;


}
