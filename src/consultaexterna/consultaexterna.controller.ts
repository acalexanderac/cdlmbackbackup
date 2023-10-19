import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ConsultaexternaService } from './consultaexterna.service';
import { CreateConsultaexternaDto } from './dto/create-consultaexterna.dto';
import { UpdateConsultaexternaDto } from './dto/update-consultaexterna.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Consultaexterna } from './entities/consultaexterna.entity';

@Controller('consultaexterna')
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


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaexternaService.findOne(+id);
  }
}
