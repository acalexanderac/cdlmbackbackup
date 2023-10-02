import {IsString} from "class-validator";

export class CreateTipotratamientoespecDto {
    @IsString()
    name: string;
}
