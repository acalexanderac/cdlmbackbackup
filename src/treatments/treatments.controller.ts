import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import {Request} from "express";
import {SelectQueryBuilder} from "typeorm";
import {Patient} from "../patients/entities/patient.entity";
import {PatientsService} from "../patients/patients.service";
import {Treatment} from "./entities/treatment.entity";

@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(createTreatmentDto);
  }

  @Get()
  findAll() {
    return this.treatmentsService.findAll();
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTreatmentDto: UpdateTreatmentDto) {
    return this.treatmentsService.update(+id, updateTreatmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentsService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const patients = await this.treatmentsService.searchPatients(term);
    return patients;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined,
  ) {
    const builder: SelectQueryBuilder<Treatment> = this.treatmentsService.createQueryBuilder('treatment');

    // Add JOINs to include related entities (patient)
    builder.leftJoin('treatment.patient', 'patient'); // Make sure the entity name matches your TypeORM entity
    builder.leftJoin('treatment.treatmentType', 'treatmentype');

    // Select the fields you need from the patient entity
    builder.addSelect(['patient.id', 'patient.docIdentificacion', 'patient.nombrePaciente']);

    if (searchString) {
      builder.where('patient.nombrePaciente ILIKE :s OR patient.docIdentificacion ILIKE :s', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('treatment.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
    }

    const perPage = 7;

    if (page === undefined) {
      page = 1;
    }

    const [data, total] = await builder
        .skip((page - 1) * perPage)
        .take(perPage)
        .getManyAndCount();

    const last_page = Math.ceil(total / perPage);

    return {
      data,
      total,
      page,
      last_page,
    };
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentsService.findOne(+id);
  }
}
