import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicadelamujerDto } from './create-clinicadelamujer.dto';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateClinicadelamujerDto extends PartialType(CreateClinicadelamujerDto) {
     @IsOptional()
  @IsString()
  fechaClinicadelamujer: string;

  @IsOptional()
  @IsString()
  antefamiliar: string;

  @IsOptional()
  @IsString()
  antepersonal: string;

  @IsOptional()
  @IsString()
  antequirurgico: string;

  @IsOptional()
  @IsString()
  antetraumatico: string;

  @IsOptional()
  @IsString()
  antealergico: string;

  @IsOptional()
  @IsString()
  antealimenticio: string;

  @IsOptional()
  @IsBoolean()
  fuma: boolean;

  @IsOptional()
  @IsString()
  regularidad: string;

  @IsOptional()
  @IsBoolean()
  anticonceptivo: boolean;

  @IsOptional()
  @IsString()
  tipoanticonceptivo: string;

  @IsOptional()
  @IsString()
  fechaanticonceptivo: string;

  @IsOptional()
  @IsBoolean()
  medicina: boolean;

  @IsOptional()
  @IsString()
  medicinadescripcion: string;

  @IsOptional()
  @IsString()
  menarg: string;

  @IsOptional()
  @IsString()
  menarhv: string;

  @IsOptional()
  @IsString()
  menarab: string;

  @IsOptional()
  @IsString()
  menarfc: string;

  @IsOptional()
  @IsString()
  menarim: string;

  @IsOptional()
  @IsString()
  menarfur: string;

  @IsOptional()
  @IsString()
  menopausia: string;

  @IsOptional()
  @IsString()
  expa: string;

  @IsOptional()
  @IsString()
  exfr: string;

  @IsOptional()
  @IsString()
  exfc: string;

  @IsOptional()
  @IsString()
  ext: string;

  @IsOptional()
  @IsString()
  k1: string;

  @IsOptional()
  @IsString()
  k2: string;

  @IsOptional()
  @IsString()
  k3: string;

  @IsOptional()
  @IsString()
  p1: string;

  @IsOptional()
  @IsString()
  p2: string;

  @IsOptional()
  @IsString()
  p3: string;

  @IsOptional()
  @IsString()
  dpi: string;

  @IsOptional()
  @IsString()
  procedimiento: string;

  @IsOptional()
  @IsString()
  fechaprocedimiento: string;

  @IsOptional()
  @IsString()
  horaprocedimiento: string;

  @IsOptional()
  @IsString()
  observaciones: string;

  @IsOptional()
  @IsBoolean()
  anestesia: boolean;

  @IsOptional()
  @IsString()
  tipoAnestesia: string;

  @IsOptional()
  @IsString()
  paciente: string;
}
