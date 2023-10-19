import { Module } from '@nestjs/common';
import { ConsultaexternaService } from './consultaexterna.service';
import { ConsultaexternaController } from './consultaexterna.controller';
import { Consultaexterna } from './entities/consultaexterna.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consultaexterna]), AuthModule, PacientesModule],
  controllers: [ConsultaexternaController],
  providers: [ConsultaexternaService, PacientesModule],
})
export class ConsultaexternaModule {}
