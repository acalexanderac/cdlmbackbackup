import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Res } from '@nestjs/common';
import { PostoperacioneService } from './postoperaciones.service';
import { CreatePostoperacioneDto } from './dto/create-postoperacione.dto';
import { UpdatePostoperacioneDto } from './dto/update-postoperacione.dto';
import { Postoperacione } from './entities/postoperacione.entity';
import { SelectQueryBuilder } from 'typeorm';
import { Response } from 'express';
import {getISOWeek} from 'date-fns';
@Controller('postoperaciones')
export class PostoperacionesController {
  constructor(private readonly postoperacionesService: PostoperacioneService) {}

  @Post()
  create(@Body() createPostoperacioneDto: CreatePostoperacioneDto) {
    return this.postoperacionesService.create(createPostoperacioneDto);
  }

  @Get()
  findAll() {
    return this.postoperacionesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostoperacioneDto: UpdatePostoperacioneDto) {
    return this.postoperacionesService.update(+id, updatePostoperacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postoperacionesService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const postoperaciones = await this.postoperacionesService.searchPatients(term);
    return postoperaciones;
  }

 @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Postoperacione> = this.postoperacionesService.createQueryBuilder('postoperaciones');

    if (searchString) {
      builder.where(' postoperaciones.tipoCirugia ILIKE :s  OR postoperaciones.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('postoperaciones.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
  const postoperacionesData = await this.postoperacionesService.generateReport(); // Llamar al servicio para obtener los datos del informe

  if (postoperacionesData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `PostoperacionesdelSistema(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(postoperacionesData);
  } else {
    res.status(404).send('Report not found');
  }
}
 
@Get('report/mesactual')
async downloadReportMes(@Res() res: Response): Promise<void> {
  const postoperacionesData = await this.postoperacionesService.generateReportMensuales(); // Llamar al servicio para obtener los datos del informe

  if (postoperacionesData) {
const date = new Date();
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const monthName = monthNames[date.getMonth()];
const fileName = `PostoperacionesdelSistema(${monthName} ${date.getFullYear()}).xlsx`;

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
res.send(postoperacionesData);
  } else {
    res.status(404).send('Report not found');
  }
}

@Get('report/semanaactual')
async downloadReportSemana(@Res() res: Response): Promise<void> {
  const postoperacionesData = await this.postoperacionesService.generateReportSemanal(); // Llamar al servicio para obtener los datos del informe

  if (postoperacionesData) {
    const date = new Date();
    const weekNumber = getISOWeek(date);
    const fileName = `PostoperacionesdelSistema(Semana ${weekNumber} - ${date.getFullYear()}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(postoperacionesData);
  } else {
    res.status(404).send('Report not found');
  }
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postoperacionesService.findOne(+id);
  }
}
