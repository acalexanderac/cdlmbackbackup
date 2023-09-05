import { IsString } from "class-validator"
export class CreateTreatmentypeDto {

    @IsString()
    name: string;
    
}
