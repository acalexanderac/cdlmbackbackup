import { Module } from '@nestjs/common';
import { CrioterapiasService } from './crioterapias.service';
import { CrioterapiasController } from './crioterapias.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";
import {Crioterapia} from "./entities/crioterapia.entity";
import {PacientesModule} from "../pacientes/pacientes.module";
import {PacientesService} from "../pacientes/pacientes.service";

@Module({
  imports: [TypeOrmModule.forFeature([Crioterapia]), AuthModule, PacientesModule],
  controllers: [CrioterapiasController],
  providers: [CrioterapiasService, PacientesService],

})
export class CrioterapiasModule {}
