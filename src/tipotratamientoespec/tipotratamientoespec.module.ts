import { Module } from '@nestjs/common';
import { TipotratamientoespecService } from './tipotratamientoespec.service';
import { TipotratamientoespecController } from './tipotratamientoespec.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { AuthModule } from '../auth/auth.module';
import {Tipotratamientoespec} from "./entities/tipotratamientoespec.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Tipotratamientoespec])], // Agrega TypeOrmModule.forFeature() aquí
  controllers: [TipotratamientoespecController],
  providers: [TipotratamientoespecService],
  exports: [TypeOrmModule],
})
export class TipotratamientoespecModule {}
