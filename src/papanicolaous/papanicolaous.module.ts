import { Module } from '@nestjs/common';
import { PapanicolaousService } from './papanicolaous.service';
import { PapanicolaousController } from './papanicolaous.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { AuthModule } from 'src/auth/auth.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { Papanicolaous } from './entities/papanicolaous.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Papanicolaous]), AuthModule, PacientesModule],
  controllers: [PapanicolaousController],
  providers: [PapanicolaousService, PacientesService],
})
export class PapanicolaousModule {}
