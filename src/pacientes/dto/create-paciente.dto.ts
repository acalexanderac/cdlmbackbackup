import { IsString, IsOptional, MaxLength, IsInt, IsPositive  } from "class-validator";

export class CreatePacienteDto {

    @IsString()
    nombrePaciente: string;

    @IsString()
    @MaxLength(13)
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
