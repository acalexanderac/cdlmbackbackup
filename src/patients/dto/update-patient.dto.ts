import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { IsString, IsPositive, IsOptional, MaxLength, IsInt  } from "class-validator";

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    @IsString()
    @IsOptional()
nombrePaciente?: string;

   @IsOptional()
    @IsString()
    @MaxLength(13)
    docIdentificacion?: string;

   
    @IsInt()
    @IsPositive()
    @IsOptional()

    edadPaciente?: number;

@IsString()
@IsOptional()
    estadoCivil?: string;

@IsString()
@IsOptional()
    noIggs?: string;

@IsInt()
@IsPositive()  
@IsOptional()
    telefono?: number;   

@IsString()
@IsOptional()
religion?: string;
    
@IsString()
@IsOptional() 
    fechaNacimiento: string;

}
