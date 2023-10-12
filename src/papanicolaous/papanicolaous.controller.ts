import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { PapanicolaousService } from './papanicolaous.service';
import { CreatePapanicolaousDto } from './dto/create-papanicolaous.dto';
import { UpdatePapanicolaousDto } from './dto/update-papanicolaous.dto';
import { Papanicolaous } from './entities/papanicolaous.entity';
import { SelectQueryBuilder } from 'typeorm';

@Controller('papanicolaous')
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
      builder.where(' papanicolaous.resultadoPapanicolaous ILIKE :s  OR colposcopias.dpi ILIKE :s ', { s: `%${searchString}%` });
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


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.papanicolaousService.findOne(+id);
  }
}
