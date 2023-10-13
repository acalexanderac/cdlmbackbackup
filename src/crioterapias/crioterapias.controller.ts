import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { CrioterapiasService } from './crioterapias.service';
import { CreateCrioterapiaDto } from './dto/create-crioterapia.dto';
import { UpdateCrioterapiaDto } from './dto/update-crioterapia.dto';
import {Request} from "express";
import {SelectQueryBuilder} from "typeorm";
import {Crioterapia} from "./entities/crioterapia.entity";

@Controller('crioterapias')
export class CrioterapiasController {
  constructor(private readonly crioterapiasService: CrioterapiasService) {}

  @Post()
  create(@Body() createCrioterapiaDto: CreateCrioterapiaDto) {
    return this.crioterapiasService.create(createCrioterapiaDto);
  }

  @Get()
  findAll() {
    return this.crioterapiasService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrioterapiaDto: UpdateCrioterapiaDto) {
    return this.crioterapiasService.update(+id, updateCrioterapiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crioterapiasService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const crioterapias = await this.crioterapiasService.searchPatients(term);
    return crioterapias;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Crioterapia> = this.crioterapiasService.createQueryBuilder('crioterapias');

    if (searchString) {
      builder.where(' crioterapias.tipoAnestesia ILIKE :s  OR crioterapias.notasCrioterapia ILIKE :s ', { s: `%${searchString}%` });
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crioterapiasService.findOne(+id);
  }
}
