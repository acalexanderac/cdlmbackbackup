import {  IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateTreatmentDto {
       

    
    @IsString()
    fechaTratamiento: string;

    @IsOptional()
        @IsString()
    tipoAnestesia?: string;

    @IsOptional()
    @IsBoolean()  
    anestesia?: boolean;

    @IsOptional()
        @IsString()
    observaciones?: string;

    @IsString()
    patient: string;

    @IsString()
    treatmentype: string;
}
