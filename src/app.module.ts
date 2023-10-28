import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesModule } from './pacientes/pacientes.module';
import { CrioterapiasModule } from './crioterapias/crioterapias.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ColposcopiasModule } from './colposcopias/colposcopias.module';
import { PapanicolaousModule } from './papanicolaous/papanicolaous.module';
import { PostoperacionesModule } from './postoperaciones/postoperaciones.module';
import { ClinicadelamujerModule } from './clinicadelamujer/clinicadelamujer.module';
import { ControlnatalModule } from './controlnatal/controlnatal.module';
import { ConsultaexternaModule } from './consultaexterna/consultaexterna.module';
import { CitasModule } from './citas/citas.module';


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
       ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    PacientesModule,
    UsersModule,
    AuthModule,
    CrioterapiasModule,
    ColposcopiasModule,
    PapanicolaousModule,
    PostoperacionesModule,
    ClinicadelamujerModule,
    ControlnatalModule,
    ConsultaexternaModule,
    CitasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
