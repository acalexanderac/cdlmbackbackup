import { Module } from '@nestjs/common';
import { ColposcopiasService } from './colposcopias.service';
import { ColposcopiasController } from './colposcopias.controller';
import { Colposcopia } from './entities/colposcopia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { AuthModule } from 'src/auth/auth.module';
import { PacientesService } from 'src/pacientes/pacientes.service';

@Module({
   imports: [TypeOrmModule.forFeature([Colposcopia]), AuthModule, PacientesModule],
  controllers: [ColposcopiasController],
  providers: [ColposcopiasService, PacientesService],
})
export class ColposcopiasModule {}
