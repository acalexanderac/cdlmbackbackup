import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import {Request} from "express";
import {SelectQueryBuilder} from "typeorm";
import {Paciente} from "./entities/paciente.entity";
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@Controller('pacientes')

export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) { }
@Auth(Role.USER)
  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
}
  
@Auth(Role.USER)
  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }


@Auth(Role.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.update(+id, updatePacienteDto);
  }

  @Auth(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(+id);
  }

  @Auth(Role.USER)
  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const patients = await this.pacientesService.searchPatients(term);
    return patients;
  }

  @Get('sort')
  @Auth(Role.USER)
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

  
  @Get('report')
async downloadReport(@Res() res: Response): Promise<void> {
  const pacientesData = await this.pacientesService.generateReport(); // Llamar al servicio para obtener los datos del informe

  if (pacientesData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `PacientesActivos(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(pacientesData);
  } else {
    res.status(404).send('Report not found');
  }
}

  @Get('report/menores')
async downloadReportMenores(@Res() res: Response): Promise<void> {
  const pacientesData = await this.pacientesService.generateReportMenores(); // Llamar al servicio para obtener los datos del informe

  if (pacientesData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `PacientesMenores(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(pacientesData);
  } else {
    res.status(404).send('Report not found');
  }
}

@Get('report/mayores')
async downloadReportMayores(@Res() res: Response): Promise<void> {
  const pacientesData = await this.pacientesService.generateReportMayores(); // Llamar al servicio para obtener los datos del informe

  if (pacientesData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `PacientesMayores(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(pacientesData);
  } else {
    res.status(404).send('Report not found');
  }
}

@Auth(Role.USER)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.pacientesService.findOne(+id);
    }

  
}