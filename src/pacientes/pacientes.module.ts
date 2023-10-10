import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {Paciente} from "./entities/paciente.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Paciente]), AuthModule],
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [TypeOrmModule]

})
export class PacientesModule {}
