import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { TreatmentypesModule } from './treatmentypes/treatmentypes.module';
import { TipotratamientoespecModule } from './tipotratamientoespec/tipotratamientoespec.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PacientesModule } from './pacientes/pacientes.module';
import { CrioterapiasModule } from './crioterapias/crioterapias.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
     
    }),
    
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PatientsModule,
    PacientesModule,
    TreatmentsModule,
    TipotratamientoespecModule,
    TreatmentypesModule,
    UsersModule,
    AuthModule,
    CrioterapiasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
