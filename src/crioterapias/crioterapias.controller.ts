import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res} from '@nestjs/common';
import { CrioterapiasService } from './crioterapias.service';
import { CreateCrioterapiaDto } from './dto/create-crioterapia.dto';
import { UpdateCrioterapiaDto } from './dto/update-crioterapia.dto';
import {Request} from "express";
import {SelectQueryBuilder} from "typeorm";
import {Crioterapia} from "./entities/crioterapia.entity";
import { Response } from 'express';
import {getISOWeek} from 'date-fns';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('crioterapias')
export class CrioterapiasController {
  constructor(private readonly crioterapiasService: CrioterapiasService) {}
  @Auth(Role.USER)

  @Post()
  create(@Body() createCrioterapiaDto: CreateCrioterapiaDto) {
    return this.crioterapiasService.create(createCrioterapiaDto);
  }
  @Auth(Role.USER)

  @Get()
  findAll() {
    return this.crioterapiasService.findAll();
  }
  @Auth(Role.USER)

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrioterapiaDto: UpdateCrioterapiaDto) {
    return this.crioterapiasService.update(+id, updateCrioterapiaDto);
  }
  @Auth(Role.USER)

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crioterapiasService.remove(+id);
  }
  @Auth(Role.USER)

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const crioterapias = await this.crioterapiasService.searchPatients(term);
    return crioterapias;
  }
  @Auth(Role.USER)

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Crioterapia> = this.crioterapiasService.createQueryBuilder('crioterapias');

    if (searchString) {
      builder.where(' crioterapias.observaciones ILIKE :s  OR crioterapias.notasCrioterapia ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('crioterapias.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
  const crioterapiasData = await this.crioterapiasService.generateReport(); // Llamar al servicio para obtener los datos del informe

  if (crioterapiasData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `CrioterapiasdelSistema(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(crioterapiasData);
  } else {
    res.status(404).send('Report not found');
  }
}
 
@Get('report/mesactual')
async downloadReportMes(@Res() res: Response): Promise<void> {
  const crioterapiasData = await this.crioterapiasService.generateReportMensuales(); // Llamar al servicio para obtener los datos del informe

  if (crioterapiasData) {
const date = new Date();
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const monthName = monthNames[date.getMonth()];
const fileName = `CrioterapiasdelSistema(${monthName} ${date.getFullYear()}).xlsx`;

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
res.send(crioterapiasData);
  } else {
    res.status(404).send('Report not found');
  }
}

@Get('report/semanaactual')
async downloadReportSemana(@Res() res: Response): Promise<void> {
  const crioterapiasData = await this.crioterapiasService.generateReportSemanal(); // Llamar al servicio para obtener los datos del informe

  if (crioterapiasData) {
    const date = new Date();
    const weekNumber = getISOWeek(date);
    const fileName = `CrioterapiasdelSistema(Semana ${weekNumber} - ${date.getFullYear()}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(crioterapiasData);
  } else {
    res.status(404).send('Report not found');
  }
}



  @Auth(Role.USER)

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crioterapiasService.findOne(+id);
  }
}
