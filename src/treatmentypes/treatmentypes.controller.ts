import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Query} from '@nestjs/common';
import { TreatmentypesService } from './treatmentypes.service';
import { CreateTreatmentypeDto } from './dto/create-treatmentype.dto';
import { UpdateTreatmentypeDto } from './dto/update-treatmentype.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import {Request} from "express";
import {SelectQueryBuilder} from "typeorm";
//import {Patient} from "../patients/entities/patient.entity";
import {Treatmentype} from "./entities/treatmentype.entity";

@Auth(Role.ADMIN)
@Controller('treatmentypes')
export class TreatmentypesController {
  constructor(private readonly treatmentypesService: TreatmentypesService) {
  }

  @Post()
  create(@Body() createTreatmentypeDto: CreateTreatmentypeDto) {
    return this.treatmentypesService.create(createTreatmentypeDto);
  }

  @Get()
  findAll() {
    return this.treatmentypesService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTreatmentypeDto: UpdateTreatmentypeDto) {
    return this.treatmentypesService.update(id, updateTreatmentypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.treatmentypesService.remove(id);
  }


  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Treatmentype> = this.treatmentypesService.createQueryBuilder('treatmentypes');

    if (searchString) {
      builder.where('treatmentypes.name ILIKE :s ', {s: `%${searchString}%`});
    }

    if (sort) {
      builder.orderBy('treatmentypes.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
  findOne(@Param('id') id: number) {
    return this.treatmentypesService.findOne(id);
  }

}
