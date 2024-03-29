import { Res,Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { PapanicolaousService } from './papanicolaous.service';
import { CreatePapanicolaousDto } from './dto/create-papanicolaous.dto';
import { UpdatePapanicolaousDto } from './dto/update-papanicolaous.dto';
import { Papanicolaous } from './entities/papanicolaous.entity';
import { SelectQueryBuilder } from 'typeorm';
import { Response } from 'express';
import {getISOWeek} from 'date-fns';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
@Controller('papanicolaous')
  @Auth(Role.USER)
export class PapanicolaousController {
  constructor(private readonly papanicolaousService: PapanicolaousService) {}

  @Post()
  create(@Body() createPapanicolaousDto: CreatePapanicolaousDto) {
    return this.papanicolaousService.create(createPapanicolaousDto);
  }

  @Get()
  findAll() {
    return this.papanicolaousService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePapanicolaousDto: UpdatePapanicolaousDto) {
    return this.papanicolaousService.update(+id, updatePapanicolaousDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.papanicolaousService.remove(+id);
  }

@Get('search')
  async searchPatients(@Query('term') term: string) {
    const papanicolaous = await this.papanicolaousService.searchPatients(term);
    return papanicolaous;
  }

 @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Papanicolaous> = this.papanicolaousService.createQueryBuilder('papanicolaous');

    if (searchString) {
      builder.where(' papanicolaous.resultadoPapanicolaous ILIKE :s  OR papanicolaous.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('papanicolaous.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
  const papanicolaousData = await this.papanicolaousService.generateReport(); // Llamar al servicio para obtener los datos del informe

  if (papanicolaousData) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `PapanicolaousdelSistema(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(papanicolaousData);
  } else {
    res.status(404).send('Report not found');
  }
}
 
@Get('report/mesactual')
async downloadReportMes(@Res() res: Response): Promise<void> {
  const papanicolaousData = await this.papanicolaousService.generateReportMensuales(); // Llamar al servicio para obtener los datos del informe

  if (papanicolaousData) {
const date = new Date();
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const monthName = monthNames[date.getMonth()];
const fileName = `PapanicolaousdelSistema(${monthName} ${date.getFullYear()}).xlsx`;

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
res.send(papanicolaousData);
  } else {
    res.status(404).send('Report not found');
  }
}

@Get('report/semanaactual')
async downloadReportSemana(@Res() res: Response): Promise<void> {
  const papanicolaousData = await this.papanicolaousService.generateReportSemanal(); // Llamar al servicio para obtener los datos del informe

  if (papanicolaousData) {
    const date = new Date();
    const weekNumber = getISOWeek(date);
    const fileName = `PapanicolaousdelSistema(Semana ${weekNumber} - ${date.getFullYear()}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(papanicolaousData);
  } else {
    res.status(404).send('Report not found');
  }
}




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.papanicolaousService.findOne(+id);
  }
}
