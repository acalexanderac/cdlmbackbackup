import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { ColposcopiasService } from './colposcopias.service';
import { CreateColposcopiaDto } from './dto/create-colposcopia.dto';
import { UpdateColposcopiaDto } from './dto/update-colposcopia.dto';
import {Request} from "express";
import { SelectQueryBuilder } from "typeorm";
import { Colposcopia } from './entities/colposcopia.entity';
@Controller('colposcopias')
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



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colposcopiasService.findOne(+id);
  }
}
