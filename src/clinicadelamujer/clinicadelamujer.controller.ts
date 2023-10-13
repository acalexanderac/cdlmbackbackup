import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ClinicadelamujerService } from './clinicadelamujer.service';
import { CreateClinicadelamujerDto } from './dto/create-clinicadelamujer.dto';
import { UpdateClinicadelamujerDto } from './dto/update-clinicadelamujer.dto';
import { Clinicadelamujer } from './entities/clinicadelamujer.entity';
import { SelectQueryBuilder } from 'typeorm';

@Controller('clinicadelamujer')
export class ClinicadelamujerController {
  constructor(private readonly clinicadelamujerService: ClinicadelamujerService) {}

  @Post()
  create(@Body() createClinicadelamujerDto: CreateClinicadelamujerDto) {
    return this.clinicadelamujerService.create(createClinicadelamujerDto);
  }

  @Get()
  findAll() {
    return this.clinicadelamujerService.findAll();
  }
 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicadelamujerDto: UpdateClinicadelamujerDto) {
    return this.clinicadelamujerService.update(+id, updateClinicadelamujerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicadelamujerService.remove(+id);
  }

  @Get('search')
  async searchPatients(@Query('term') term: string) {
    const clinicadelamujer = await this.clinicadelamujerService.searchPatients(term);
    return clinicadelamujer;
  }

  @Get('sort')
  async backend(
      @Req() req: Request,
      @Query('s') searchString: string,
      @Query('sort') sort: string,
      @Query('page') page: number | undefined, // Change the type to number | undefined
  ) {
    const builder: SelectQueryBuilder<Clinicadelamujer> = this.clinicadelamujerService.createQueryBuilder('clinicadelamujer');

    if (searchString) {
      builder.where(' clinicadelamujer.procedimiento ILIKE :s  OR clinicadelamujer.dpi ILIKE :s ', { s: `%${searchString}%` });
    }

    if (sort) {
      builder.orderBy('clinicadelamujer.id', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
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
    return this.clinicadelamujerService.findOne(+id);
  }

}
