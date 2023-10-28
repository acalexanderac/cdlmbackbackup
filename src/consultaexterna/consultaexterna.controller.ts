import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { ConsultaexternaService } from './consultaexterna.service';
import { CreateConsultaexternaDto } from './dto/create-consultaexterna.dto';
import { UpdateConsultaexternaDto } from './dto/update-consultaexterna.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Consultaexterna } from './entities/consultaexterna.entity';
import { Response } from 'express';
import {getISOWeek} from 'date-fns';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
@Controller('consultaexterna')
  @Auth(Role.ADMIN)
export class ConsultaexternaController {
  constructor(private readonly consultaexternaService: ConsultaexternaService) {}

  @Post()
  create(@Body() createConsultaexternaDto: CreateConsultaexternaDto) {
    return this.consultaexternaService.create(createConsultaexternaDto);
  }

  @Get()
  findAll() {
    return this.consultaexternaService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultaexternaDto: UpdateConsultaexternaDto) {
    return this.consultaexternaService.update(+id, updateConsultaexternaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultaexternaService.remove(+id);
  }

@Get('search')
  async searchPatients(@Query('term') term: string) {
    const consultaexterna = await this.consultaexternaService.searchPatients(term);
    return consultaexterna;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Consultaexterna> = this.consultaexternaService.createQueryBuilder('consultaexterna');

    if (searchString) {
      builder.where('consultaexterna.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('consultaexterna.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
  const consultaExternaData = await this.consultaexternaService.generateReport(); // Llamar al servicio para obtener los datos del informe

  if (consultaExternaData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `ConsultaExternadelSistema(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(consultaExternaData);
  } else {
    res.status(404).send('Report not found');
  }
}
 
@Get('report/mesactual')
async downloadReportMes(@Res() res: Response): Promise<void> {
  const consultaExternaData = await this.consultaexternaService.generateReportMensuales(); // Llamar al servicio para obtener los datos del informe

  if (consultaExternaData) {
const date = new Date();
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const monthName = monthNames[date.getMonth()];
const fileName = `ConsultaExternadelSistema(${monthName} ${date.getFullYear()}).xlsx`;

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
res.send(consultaExternaData);
  } else {
    res.status(404).send('Report not found');
  }
}

@Get('report/semanaactual')
async downloadReportSemana(@Res() res: Response): Promise<void> {
  const consultaExternaData = await this.consultaexternaService.generateReportSemanal(); // Llamar al servicio para obtener los datos del informe

  if (consultaExternaData) {
    const date = new Date();
    const weekNumber = getISOWeek(date);
    const fileName = `ConsultaExternadelSistema(Semana ${weekNumber} - ${date.getFullYear()}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(consultaExternaData);
  } else {
    res.status(404).send('Report not found');
  }
}
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaexternaService.findOne(+id);
  }
}
