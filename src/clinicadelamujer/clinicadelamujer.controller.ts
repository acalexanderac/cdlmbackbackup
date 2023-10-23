import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Res } from '@nestjs/common';
import { ClinicadelamujerService } from './clinicadelamujer.service';
import { CreateClinicadelamujerDto } from './dto/create-clinicadelamujer.dto';
import { UpdateClinicadelamujerDto } from './dto/update-clinicadelamujer.dto';
import { Clinicadelamujer } from './entities/clinicadelamujer.entity';
import { SelectQueryBuilder } from 'typeorm';
import { Response } from 'express';
import {getISOWeek} from 'date-fns';
@Controller('clinicadelamujer')
export class ClinicadelamujerController {
  constructor(private readonly clinicadelamujerService: ClinicadelamujerService) {}

  @Post()
  create(@Body() createClinicadelamujerDto: CreateClinicadelamujerDto) {
    return this.clinicadelamujerService.create(createClinicadelamujerDto);
  }

  @Get()
  findAll() {
    return this.clinicadelamujerService.findAll();
  }
 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicadelamujerDto: UpdateClinicadelamujerDto) {
    return this.clinicadelamujerService.update(+id, updateClinicadelamujerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicadelamujerService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const clinicadelamujer = await this.clinicadelamujerService.searchPatients(term);
    return clinicadelamujer;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Clinicadelamujer> = this.clinicadelamujerService.createQueryBuilder('clinicadelamujer');

    if (searchString) {
      builder.where(' clinicadelamujer.procedimiento ILIKE :s  OR clinicadelamujer.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('clinicadelamujer.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
  const clinicadelamujerData = await this.clinicadelamujerService.generateReport(); // Llamar al servicio para obtener los datos del informe

  if (clinicadelamujerData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `ClinicadelaMujerdelSistema(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(clinicadelamujerData);
  } else {
    res.status(404).send('Report not found');
  }
}
 
@Get('report/mesactual')
async downloadReportMes(@Res() res: Response): Promise<void> {
  const clinicadelamujerData = await this.clinicadelamujerService.generateReportMensuales(); // Llamar al servicio para obtener los datos del informe

  if (clinicadelamujerData) {
const date = new Date();
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const monthName = monthNames[date.getMonth()];
const fileName = `ClinicadelaMujerdelSistema(${monthName} ${date.getFullYear()}).xlsx`;

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
res.send(clinicadelamujerData);
  } else {
    res.status(404).send('Report not found');
  }
}

@Get('report/semanaactual')
async downloadReportSemana(@Res() res: Response): Promise<void> {
  const clinicadelamujerData = await this.clinicadelamujerService.generateReportSemanal(); // Llamar al servicio para obtener los datos del informe

  if (clinicadelamujerData) {
    const date = new Date();
    const weekNumber = getISOWeek(date);
    const fileName = `ClinicadelaMujerdelSistema(Semana ${weekNumber} - ${date.getFullYear()}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(clinicadelamujerData);
  } else {
    res.status(404).send('Report not found');
  }
}




   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicadelamujerService.findOne(+id);
  }

}
