import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res} from '@nestjs/common';
import { ColposcopiasService } from './colposcopias.service';
import { CreateColposcopiaDto } from './dto/create-colposcopia.dto';
import { UpdateColposcopiaDto } from './dto/update-colposcopia.dto';
import {Request} from "express";
import { SelectQueryBuilder } from "typeorm";
import { Colposcopia } from './entities/colposcopia.entity';
import { Response } from 'express';
import {getISOWeek} from 'date-fns';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
@Controller('colposcopias')
@Auth(Role.USER)
export class ColposcopiasController {
  constructor(private readonly colposcopiasService: ColposcopiasService) {}

  @Post()
  create(@Body() createColposcopiaDto: CreateColposcopiaDto) {
    return this.colposcopiasService.create(createColposcopiaDto);
  }

  @Get()
  findAll() {
    return this.colposcopiasService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColposcopiaDto: UpdateColposcopiaDto) {
    return this.colposcopiasService.update(+id, updateColposcopiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colposcopiasService.remove(+id);
  }

   @Get('search')
  async searchPatients(@Query('term') term: string) {
    const colposcopias = await this.colposcopiasService.searchPatients(term);
    return colposcopias;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Colposcopia> = this.colposcopiasService.createQueryBuilder('colposcopias');

    if (searchString) {
      builder.where(' colposcopias.resultadoBiopsiacervix ILIKE :s  OR colposcopias.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('colposcopias.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
  const colposcopiasData = await this.colposcopiasService.generateReport(); // Llamar al servicio para obtener los datos del informe

  if (colposcopiasData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `ColposcopiasdelSistema(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(colposcopiasData);
  } else {
    res.status(404).send('Report not found');
  }
}
 
@Get('report/mesactual')
async downloadReportMes(@Res() res: Response): Promise<void> {
  const colposcopiasData = await this.colposcopiasService.generateReportMensuales(); // Llamar al servicio para obtener los datos del informe

  if (colposcopiasData) {
const date = new Date();
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const monthName = monthNames[date.getMonth()];
const fileName = `ColposcopiasdelSistema(${monthName} ${date.getFullYear()}).xlsx`;

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
res.send(colposcopiasData);
  } else {
    res.status(404).send('Report not found');
  }
}

@Get('report/semanaactual')
async downloadReportSemana(@Res() res: Response): Promise<void> {
  const colposcopiasData = await this.colposcopiasService.generateReportSemanal(); // Llamar al servicio para obtener los datos del informe

  if (colposcopiasData) {
    const date = new Date();
    const weekNumber = getISOWeek(date);
    const fileName = `ColposcopiasdelSistema(Semana ${weekNumber} - ${date.getFullYear()}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(colposcopiasData);
  } else {
    res.status(404).send('Report not found');
  }
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colposcopiasService.findOne(+id);
  }
}
