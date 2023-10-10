import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import {Request} from "express";
import {SelectQueryBuilder} from "typeorm";
import {Paciente} from "./entities/paciente.entity";

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.update(+id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const patients = await this.pacientesService.searchPatients(term);
    return patients;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Paciente> = this.pacientesService.createQueryBuilder('patients');

    if (searchString) {
      builder.where('patients.nombrePaciente ILIKE :s OR patients.docIdentificacion ILIKE :s', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('patients.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
    }

    const perPage = 7;

    if (page === undefined) {
      // If page is undefined, set it to 1 by default
      page = 1;
    }

    const [data, total] = await builder
        .offset((page - 1) * perPage)
        .limit(perPage)
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
    return this.pacientesService.findOne(+id);
  }
}
