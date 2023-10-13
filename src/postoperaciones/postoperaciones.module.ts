import { Module } from '@nestjs/common';
import { PostoperacionesService } from './postoperaciones.service';
import { PostoperacionesController } from './postoperaciones.controller';
import { Postoperacione } from './entities/postoperacione.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { PacientesService } from 'src/pacientes/pacientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Postoperacione]), AuthModule, PacientesModule],
  controllers: [PostoperacionesController],
  providers: [PostoperacionesService, PacientesService],
})
export class PostoperacionesModule {}
