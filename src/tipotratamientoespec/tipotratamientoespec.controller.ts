import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Query} from '@nestjs/common';
import { TipotratamientoespecService } from './tipotratamientoespec.service';
import { CreateTipotratamientoespecDto } from './dto/create-tipotratamientoespec.dto';
import { UpdateTipotratamientoespecDto } from './dto/update-tipotratamientoespec.dto';
import {Auth} from "../auth/decorators/auth.decorator";
import {Role} from "../common/enums/rol.enum";
import {Request} from "express";
import {SelectQueryBuilder} from "typeorm";
import {Tipotratamientoespec} from "./entities/tipotratamientoespec.entity";

@Auth(Role.ADMIN)
@Controller('tipotratamientoespec')
export class TipotratamientoespecController {
  constructor(private readonly tipotratamientoespecService: TipotratamientoespecService) {}

  @Post()
  create(@Body() createTipotratamientoespecDto: CreateTipotratamientoespecDto) {
    return this.tipotratamientoespecService.create(createTipotratamientoespecDto);
  }

  @Get()
  findAll() {
    return this.tipotratamientoespecService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipotratamientoespecDto: UpdateTipotratamientoespecDto) {
    return this.tipotratamientoespecService.update(+id, updateTipotratamientoespecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipotratamientoespecService.remove(+id);
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Tipotratamientoespec> = this.tipotratamientoespecService.createQueryBuilder('tipotratamientoespec');

    if (searchString) {
      builder.where('tipotratamientoespec.name ILIKE :s ', {s: `%${searchString}%`});
    }

    if (sort) {
      builder.orderBy('tipotratamientoespec.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
    return this.tipotratamientoespecService.findOne(+id);
  }

}
