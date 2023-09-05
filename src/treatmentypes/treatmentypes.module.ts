import { Module } from '@nestjs/common';
import { TreatmentypesService } from './treatmentypes.service';
import { TreatmentypesController } from './treatmentypes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatmentype } from './entities/treatmentype.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Treatmentype]), AuthModule],
  controllers: [TreatmentypesController],
  providers: [TreatmentypesService, Treatmentype],
  exports: [TypeOrmModule]
})
export class TreatmentypesModule {}
