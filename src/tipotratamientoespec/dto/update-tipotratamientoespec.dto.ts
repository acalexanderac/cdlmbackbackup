import { PartialType } from '@nestjs/mapped-types';
import { CreateTipotratamientoespecDto } from './create-tipotratamientoespec.dto';
import {IsOptional, IsString} from "class-validator";

export class UpdateTipotratamientoespecDto extends PartialType(CreateTipotratamientoespecDto) {
    @IsString()
    @IsOptional()
    name: string;
}
