import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { ControlnatalService } from './controlnatal.service';
import { CreateControlnatalDto } from './dto/create-controlnatal.dto';
import { UpdateControlnatalDto } from './dto/update-controlnatal.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Controlnatal } from './entities/controlnatal.entity';
import { Response } from 'express';
import {getISOWeek} from 'date-fns';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('controlnatal')
  @Auth(Role.ADMIN)
export class ControlnatalController {
  constructor(private readonly controlnatalService: ControlnatalService) {}

  @Post()
  create(@Body() createControlnatalDto: CreateControlnatalDto) {
    return this.controlnatalService.create(createControlnatalDto);
  }

  @Get()
  findAll() {
    return this.controlnatalService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateControlnatalDto: UpdateControlnatalDto) {
    return this.controlnatalService.update(+id, updateControlnatalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controlnatalService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const controlnatal = await this.controlnatalService.searchPatients(term);
    return controlnatal;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Controlnatal> = this.controlnatalService.createQueryBuilder('controlnatal');

    if (searchString) {
      builder.where('controlnatal.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('controlnatal.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
  const controlnatal = await this.controlnatalService.generateReport(); // Llamar al servicio para obtener los datos del informe

  if (controlnatal) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const fileName = `ControlNataldelSistema(${dateString}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(controlnatal);
  } else {
    res.status(404).send('Report not found');
  }
}
 
@Get('report/mesactual')
async downloadReportMes(@Res() res: Response): Promise<void> {
  const controlnatal = await this.controlnatalService.generateReportMensuales(); // Llamar al servicio para obtener los datos del informe

  if (controlnatal) {
const date = new Date();
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const monthName = monthNames[date.getMonth()];
const fileName = `ControlNataldelSistema(${monthName} ${date.getFullYear()}).xlsx`;

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
res.send(controlnatal);
  } else {
    res.status(404).send('Report not found');
  }
}

@Get('report/semanaactual')
async downloadReportSemana(@Res() res: Response): Promise<void> {
  const controlnatal = await this.controlnatalService.generateReportSemanal(); // Llamar al servicio para obtener los datos del informe

  if (controlnatal) {
    const date = new Date();
    const weekNumber = getISOWeek(date);
    const fileName = `ControlNataldelSistema(Semana ${weekNumber} - ${date.getFullYear()}).xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Tipo MIME para archivos XLSX
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(controlnatal);
  } else {
    res.status(404).send('Report not found');
  }
}
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controlnatalService.findOne(+id);
  }
}
