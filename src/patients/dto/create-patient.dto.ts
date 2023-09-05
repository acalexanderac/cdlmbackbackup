import { IsString, IsPositive, IsOptional, MaxLength, IsInt  } from "class-validator";
export class CreatePatientDto {

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
fechaNacimiento: string;
}
