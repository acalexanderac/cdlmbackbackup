import { Module } from '@nestjs/common';
import { ClinicadelamujerService } from './clinicadelamujer.service';
import { ClinicadelamujerController } from './clinicadelamujer.controller';
import { Clinicadelamujer } from './entities/clinicadelamujer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
    imports: [TypeOrmModule.forFeature([Clinicadelamujer]), AuthModule, PacientesModule],
  controllers: [ClinicadelamujerController],
  providers: [ClinicadelamujerService, PacientesModule],
})
export class ClinicadelamujerModule {}
