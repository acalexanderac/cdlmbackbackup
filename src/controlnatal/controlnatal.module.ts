import { Module } from '@nestjs/common';
import { ControlnatalService } from './controlnatal.service';
import { ControlnatalController } from './controlnatal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controlnatal } from './entities/controlnatal.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';

@Module({
   imports: [TypeOrmModule.forFeature([Controlnatal]), AuthModule, PacientesModule],
  controllers: [ControlnatalController],
  providers: [ControlnatalService, PacientesModule],
})
export class ControlnatalModule {}
