import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TreatmentsService } from './treatments.service';
import { TreatmentsController } from './treatments.controller';
import { PatientsModule } from '../patients/patients.module';
import { PatientsService } from '../patients/patients.service';
import { Treatment } from './entities/treatment.entity';
import { Treatmentype } from '../treatmentypes/entities/treatmentype.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment, Treatmentype]), PatientsModule, Treatmentype, AuthModule],
  controllers: [TreatmentsController],
  providers: [TreatmentsService, PatientsService, Treatmentype]
})
export class TreatmentsModule {}
