import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';
@Module({
  imports: [TypeOrmModule.forFeature([Cita]), AuthModule, PacientesModule],
  controllers: [CitasController],
  providers: [CitasService, PacientesModule],
})
export class CitasModule {}
